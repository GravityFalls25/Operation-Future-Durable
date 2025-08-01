kill @e[type=technocite:flying_point,name=point15]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point15
tag @e[name=point15] add cc

tag @e[tag=cam] remove need15

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
