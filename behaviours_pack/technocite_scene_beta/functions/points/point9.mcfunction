kill @e[type=technocite:flying_point,name=point9]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point9
tag @e[name=point9] add cc

tag @e[tag=cam] remove need9

execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first
