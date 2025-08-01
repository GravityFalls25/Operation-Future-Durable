#bridge-file-version: #13
kill @e[type=technocite:flying_point,name=point2]
execute as @e[type=player,tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point point2
tag @e[name=point2] add cc
 
tag @e[tag=cam] remove need2
 
execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first