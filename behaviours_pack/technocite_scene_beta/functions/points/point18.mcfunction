kill @e[type=technocite:flying_point,name=point18]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point18
tag @e[name=point18] add cc

tag @e[tag=cam] remove need18

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
