kill @e[type=technocite:flying_point,name=point14]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point14
tag @e[name=point14] add cc

tag @e[tag=cam] remove need14

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
