kill @e[type=technocite:flying_point,name=point19]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point19
tag @e[name=point19] add cc

tag @e[tag=cam] remove need19

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
