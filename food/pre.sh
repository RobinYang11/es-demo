

# echo "hello"
# echo $RANDOM

name = "$RANDOM"

json = '{
  "name": $name,
  "cname":"test"
}'

curl --header "Content-Type: application/json" -X POST -d $json  http://localhost:9200/food/friut 

# for ((i=0 ;i<100;i++));do
#   echo $i
# done;