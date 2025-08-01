kill @e[type=technocite:flying_point,name=point17]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point17
tag @e[name=point17] add cc

tag @e[tag=cam] remove need17

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
