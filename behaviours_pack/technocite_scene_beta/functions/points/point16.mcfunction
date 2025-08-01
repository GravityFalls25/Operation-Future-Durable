kill @e[type=technocite:flying_point,name=point16]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point16
tag @e[name=point16] add cc

tag @e[tag=cam] remove need16

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
