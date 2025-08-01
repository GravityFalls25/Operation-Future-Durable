kill @e[type=technocite:flying_point,name=point4]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point4
tag @e[name=point4] add cc

tag @e[tag=cam] remove need4

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
