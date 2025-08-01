kill @e[type=technocite:flying_point,name=point7]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point7
tag @e[name=point7] add cc

tag @e[tag=cam] remove need7

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
