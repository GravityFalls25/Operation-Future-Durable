kill @e[type=technocite:flying_point,name=point12]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point12
tag @e[name=point12] add cc

tag @e[tag=cam] remove need12

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
