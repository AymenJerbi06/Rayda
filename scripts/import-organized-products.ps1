$ErrorActionPreference = 'Stop'
$sourceRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..\organized Products')).Path
$destinationRoot = Join-Path $PSScriptRoot '..\assets\products\organized'
New-Item -ItemType Directory -Force -Path $destinationRoot | Out-Null

$groups = @(
  @{ Folder = '01 - Bracelets Bazi (sur-mesure)'; Slug = 'bracelet-bazi' },
  @{ Folder = '02 - Collier Bazi Complet'; Slug = 'collier-bazi' },
  @{ Folder = '03 - Bracelet Energie Amour'; Slug = 'bracelet-amour' },
  @{ Folder = '04 - Porte-cles Pierre'; Slug = 'porte-cles-pierre' },
  @{ Folder = '05 - Porte-cles Arbre de Vie'; Slug = 'porte-cles-arbre-vie' },
  @{ Folder = '06 - Portefeuille Argent (Hafidha El Mel)'; Slug = 'portefeuille-hafidha' },
  @{ Folder = '07 - Carte Million Dollar Doree'; Slug = 'carte-million-dollar' },
  @{ Folder = '08 - Decor Abondance (Dollar-Couronne-Infini)'; Slug = 'decor-abondance' },
  @{ Folder = '09 - Cle de Vie Doree (Ankh)'; Slug = 'cle-de-vie' },
  @{ Folder = '10 - Decor Fleur de Vie Doree'; Slug = 'fleur-de-vie' },
  @{ Folder = '11 - Pendentif Voiture Fleur de Vie'; Slug = 'pendentif-voiture-fleur' },
  @{ Folder = '12 - Pendentif Voiture Cle de Vie'; Slug = 'pendentif-voiture-ankh' }
)

foreach ($group in $groups) {
  $folder = Join-Path $sourceRoot $group.Folder
  $photos = @(Get-ChildItem -LiteralPath $folder -File -Filter '*.jpg' | Sort-Object Name)
  if ($photos.Count -eq 0) { throw "No photos found in $folder" }
  for ($index = 0; $index -lt $photos.Count; $index++) {
    $name = '{0}-{1:D2}.jpg' -f $group.Slug, ($index + 1)
    Copy-Item -LiteralPath $photos[$index].FullName -Destination (Join-Path $destinationRoot $name)
  }
  Write-Output ('{0}: {1} photos' -f $group.Slug, $photos.Count)
}
