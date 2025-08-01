kill @e[type=technocite:flying_point,name=point5]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point5
tag @e[name=point5] add cc

tag @e[tag=cam] remove need5

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
