kill @e[type=technocite:flying_point,name=point3]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point3
tag @e[name=point3] add cc

tag @e[tag=cam] remove need3

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first