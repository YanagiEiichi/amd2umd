mkdir -p dist

# CommonJS 普通测试

for i in $(find src -type f)
do
  dist=$(echo $i | sed 's/^src/dist/')
  ../index.js $i > $dist
done

test ! "$(grep "require([^']" dist -r)" # 不应该有 require 接一个变量的情况
test "$(node -pe 'require("./dist/a.js")')" = '{"a":1,"b":2}'
test "$(node -pe 'require("./dist/c.js")')" = 'c'

# 指定 Global 名称测试
(
  echo 'void function(module, exports) {';
  ../index.js src/c.js -n HEHE;
  echo 'console.assert(HEHE === "c");';
  echo '}()';
) | node
