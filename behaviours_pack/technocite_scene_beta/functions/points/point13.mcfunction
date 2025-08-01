kill @e[type=technocite:flying_point,name=point13]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point13
tag @e[name=point13] add cc

tag @e[tag=cam] remove need13

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
