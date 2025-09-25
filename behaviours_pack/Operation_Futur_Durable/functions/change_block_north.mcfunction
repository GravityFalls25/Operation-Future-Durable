# rotate_block.mcfunction
# Vérifie le bloc sous le joueur et le fait "tourner" Diamant → Lapis → Émeraude → Diamant

# Récupérer la position sous le joueur

# Étape 1 : remplacer par un bloc intermédiaire
execute if block ~ ~-1 ~1 diamond_block run setblock ~ ~-1 ~1 blue_concrete
execute if block ~ ~-1 ~1 lapis_block run setblock ~ ~-1 ~1 green_concrete
execute if block ~ ~-1 ~1 emerald_block run setblock ~ ~-1 ~1 white_concrete
execute if block ~ ~-1 ~1 air run setblock ~ ~-1 ~1 red_concrete

# Étape 2 : remplacer le bloc intermédiaire par le bloc final
execute if block ~ ~-1 ~1 blue_concrete run setblock ~ ~-1 ~1 lapis_block
execute if block ~ ~-1 ~1 green_concrete run setblock ~ ~-1 ~1 emerald_block
execute if block ~ ~-1 ~1 red_concrete run setblock ~ ~-1 ~1 diamond_block
execute if block ~ ~-1 ~1 white_concrete run setblock ~ ~-1 ~1 air

