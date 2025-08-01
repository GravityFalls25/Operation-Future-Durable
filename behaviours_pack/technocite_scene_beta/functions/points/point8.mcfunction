kill @e[type=technocite:flying_point,name=point8]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point8
tag @e[name=point8] add cc

tag @e[tag=cam] remove need8

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
