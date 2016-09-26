cp src/* dist
for i in $(find src -type f)
do
  dist=$(echo $i | sed 's/^src/dist/')
  ../index.js $i > $dist
done

test ! "$(grep "require([^']" dist -r)" # 不应该有 require 接一个变量的情况
test "$(node -p -e 'require("./dist/a.js")')" = '{"a":1,"b":2}'
test "$(node -p -e 'require("./dist/c.js")')" = 'c'
