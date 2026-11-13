# Makes a 480px-wide copy of every product photo in assets/products/organized/ into
# assets/products/organized/480/. Cards, gallery thumbnails and the cart use these lighter
# copies; the full photo is still used for the main product image and the zoom view.
# Re-run after scripts/import-organized-products.ps1 brings in new photos. The build stops
# with a clear message if a product photo has no 480px copy.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$sourceRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\assets\products\organized')).Path
$outputRoot = Join-Path $sourceRoot '480'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$targetWidth = 480
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]80)

$count = 0
foreach ($file in Get-ChildItem -LiteralPath $sourceRoot -File -Filter '*.jpg' | Sort-Object Name) {
  $source = [System.Drawing.Image]::FromFile($file.FullName)
  try {
    # The imported photos carry no EXIF rotation today; honour it anyway if a future photo does.
    if ($source.PropertyIdList -contains 0x0112) {
      switch ([BitConverter]::ToUInt16($source.GetPropertyItem(0x0112).Value, 0)) {
        3 { $source.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        6 { $source.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        8 { $source.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
      }
    }
    $width = [Math]::Min($targetWidth, $source.Width)
    $height = [int][Math]::Round($source.Height * $width / $source.Width)
    $bitmap = New-Object System.Drawing.Bitmap $width, $height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $attributes = New-Object System.Drawing.Imaging.ImageAttributes
    try {
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $attributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
      $graphics.DrawImage($source, (New-Object System.Drawing.Rectangle 0, 0, $width, $height), 0, 0, $source.Width, $source.Height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
      $bitmap.Save((Join-Path $outputRoot $file.Name), $jpegCodec, $encoderParams)
      $count++
    } finally {
      $attributes.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
    }
  } finally {
    $source.Dispose()
  }
}
Write-Output ('Made {0} photo copies at {1}px in {2}' -f $count, $targetWidth, $outputRoot)
