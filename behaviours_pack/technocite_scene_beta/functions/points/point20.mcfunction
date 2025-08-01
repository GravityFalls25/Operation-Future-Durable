kill @e[type=technocite:flying_point,name=point20]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point20
tag @e[name=point20] add cc

tag @e[tag=cam] remove need20

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
