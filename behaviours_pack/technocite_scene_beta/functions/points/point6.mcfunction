kill @e[type=technocite:flying_point,name=point6]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point6
tag @e[name=point6] add cc

tag @e[tag=cam] remove need6

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
