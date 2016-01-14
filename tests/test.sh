cp src/* dist
for i in $(find src -type f)
do
  dist=$(echo $i | sed 's/^src/dist/')
  ../index.js $i > $dist
done

test "$(node -p -e 'require("./dist/a.js")')" = '{"a":1,"b":2}'
