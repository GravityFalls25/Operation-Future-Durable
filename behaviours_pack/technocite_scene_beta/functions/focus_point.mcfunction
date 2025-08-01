tag @e[tag=target] remove target
execute as @e[tag=cam] at @s positioned ~ ~ ~ run summon technocite:flying_point target
tag @e[name=target] add cc
tag @e[name=target] add target
execute as @e[tag=target] at @s positioned ~ ~ ~ run say §aFocus Point set
 
execute as @a[tag=!cam] at @s positioned ~ ~ ~ run say §cPlease add new Replay first