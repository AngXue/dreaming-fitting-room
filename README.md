# dreaming-fitting-room
## 实体说明
- 返回结果 Result
  - 状态码 code（0表示成功，-1表示出错）int
  - 状态描述 description（例如：“登录成功”）
  - 返回数据 data（例如：User对象）Object
  - 下一步url路径 nextAction（例如：“/account/login”）
- 账号信息 User
  - id（唯一，主键）int
  - 身份 identity（0为普通用户，1为管理员）int
  - 用户名 name（唯一）
  - 性别 gender
  - 密码 passwd
  - 真实姓名 realName
  - 模型ID modelID（maleAvatar_01, maleAvatar_02, femaleAvatar_01, femaleAvatar_02）
- 服饰类别 ClothCategory
  - id（唯一，主键）
  - 编号 clothCategoryID（唯一）
  - 名称 clothCategoryName（唯一）
- 服饰细目 Cloth
  - id (唯一，主键) int
  - 编号 clothID（唯一）
  - 名称 clothName
  - 价格 clothPrice（数值型）
  - 性别 clothGender（男/女）
  - 分类 clothCategoryName（服饰类别名）
  - 图片 clothImageName（图片全名，不可为空，默认路径为特定图，如default.png）
- 已着装着装服饰 DressedCloth
  - 所属用户名 belongUserName（唯一，主键）
  - extends -> `Cloth`
  - 层级 zIndex int
## 接口说明
### 账号信息
- 账号登录
  - url: /account/login
  - 前端传入: User对象（需要包含name, passwd）
  - 后端返回
    - 登录失败: Result(0, "登录成功", "", "")
    - 登录成功: Result(-1, "用户名或密码错误", User user, "") 用户名不存在或者与密码不匹配
- 账号注册
  - url: /account/register
  - 前端传入: User对象（需要包含除id外的所有属性）
  - 后端返回
    - 注册失败: Result(0, "注册成功", "", "")
    - 注册成功: Result(-1, "用户名重复", User user, "") 用户名name属性为唯一值
- 账号更新
  - url: /account/update
  - 前端传入: User对象（需要包含除id外的所有属性）
  - 后端返回
    - 更新成功: Result(0, "更新成功", User user, "")
- 账号删除
  - url: /account/remove
  - 前端传入: User对象（需要包含name）
  - 后端返回
    - 删除成功: Result(0, "删除成功", "", "")
- 获取全部账号
  - url: /account/getAll
  - 前端传入: 无
  - 后端返回
    - 获取成功: Result(0, "获取成功", List<User> users, "")
- 获取一个账号
  - url: /account/getSingleUser
  - 前端传入: User对象（需要包含name）
  - 后端返回
    - 获取成功: Result(0, "获取成功", User user, "")
    - 获取成功: Result(0, "无此账户", User user, "")
---
### 服饰类别
- 添加服饰类别
  - url: /clothCategory/add
  - 前端传入: ClothCategory对象（需要包含clothCategoryID, clothCategoryName）
  - 后端返回
    - 添加成功: Result(0, "添加成功", ClothCategory clothCategory, "")
    - 添加失败: Result(-1, "编号或服饰名重复", "", "") 编号或服饰名唯一
- 更新服饰类别
  - url: /clothCategory/update
  - 前端传入: ClothCategory对象（需要包含所有属性）
  - 后端返回
    - 更新成功: Result(0, "更新成功", ClothCategory clothCategory, "")
- 删除服饰类别
  - url: /clothCategory/remove
  - 前端传入: ClothCategory对象（需要包含所有属性）
  - 后端返回
    - 删除成功: Result(0, "删除成功", "", "")
- 获取全部服饰类别
  - url: /clothCategory/getAll
  - 前端传入: 无
  - 后端返回
    - 获取成功: Result(0, "获取成功", List<ClothCategory> clothCategories, "")
- 获取一个服饰类别
  - url: /clothCategory/getSingleCategory
  - 前端传入: ClothCategory对象（需要包含clothCategoryID）
  - 后端返回
    - 获取成功: Result(0, "获取成功", ClothCategory clothCategory, "")
---
### 服饰
- 添加服饰
  - url: /cloth/add
  - 前端传入: Cloth对象（需要包含除id以外的所有属性）
  - 后端返回
    - 添加成功: Result(0, "添加成功", Cloth cloth, "")
    - 添加失败: Result(-1, "服饰编号重复", Cloth cloth, "")
- 更新服饰
  - url: /cloth/update
  - 前端传入: Cloth对象（需要包含所有属性）
  - 后端返回
    - 更新成功: Result(0, "更新成功", "", "")
    - 更新失败: Result(-1, "服饰编号重复", Cloth cloth, "")
- 删除服饰
  - url: /cloth/remove
  - 前端传入: Cloth对象（需要包含clothID）
  - 后端返回
    - 删除成功: Result(0, "删除成功", "", "")
- 查询服饰
  - url: /cloth/search
  - 前端传入: Cloth对象（需要包含clothGender, clothCategoryName）
  - 后端返回
    - 查询成功: Result(0, "查询成功", List<Cloth> clothes, "")
- 获取单个服饰
  - url: /cloth/getSingle
  - 前端传入: Cloth对象（需要包含clothID）
  - 后端返回
    - 查询成功: Result(0, "查询成功", Cloth cloth, "")
- 上传服饰图片
  - url: /file/uploadClothImage
  - 前端传入: 图片文件
  - 后端返回
    - 接收成功: Result(0, String fileName, "", "")
    - 接收失败: Result(-1, "数据出错", "", "")
---
### 已着装服饰
- 获得用户已着装服饰列表
   - url: /dressedClothes/getClothList
   - 前端传入: User对象（需要包含name）
   - 后端返回
      - 获得成功: Result(0, "获得成功", List<DressedCloth>, "")
- 添加用户已着装服饰
  - url: /dressedClothes/add
  - 前端传入: DressedCloth对象（需要包含DressedCloth所有属性）
  - 后端返回
    - 添加成功: Result(0, "添加成功", "", "")
- 删除用户已着装服饰
  - url: /dressedClothes/remove
  - 前端传入: DressedCloth对象（需要包含belongUserName）
  - 后端返回
    - 删除成功: Result(0, "删除成功", "", "")
- 更新用户已着装服饰
  - url: /dressedClothes/update
  - 前端传入: DressedCloth对象（需要包含DressedCloth所有属性）
  - 后端返回
    - 更新成功: Result(0, "更新成功", "", "")
## 第一阶段流程说明
- ...
## 第二阶段流程说明
- 用户管理界面
  > 前端提取session中User对象的`identity`属性，判断是否为管理员，若不是则禁止继续操作，否则向后端`/account/getAll`发送POST请求，后端将返回携带数据库中所有的User对象数据的Result对象。前端显示所有User对象的表数据后，对User对象进行的修改/删除操作分别提交到`/user/update`和`/user/remove`，且在完成后重新向`/account/getAll`发送请求获得更新后的数据并刷新前端表数据。
  > 前端提取sessionStorage中User对象的identity属性，判断是否为管理员，若不是则禁止继续操作，否则向后端`/account/getAll`发送POST请求，后端将返回携带数据库中所有的User对象数据的Result对象。前端显示所有User对象的表数据后，对User对象进行的修改/删除操作分别提交到`/user/update`和`/user/remove`，且在完成后重新向`/account/getAll`发送请求获得更新后的数据并刷新前端表数据。
- 服饰类别管理
  > 前端提取session中User对象的`identity`属性，判断是否为管理员，若不是则禁止继续操作，否则向后端`/clothCategory/getAll`发送POST请求，后端将返回携带数据库中所有的ClothCategory对象数据的Result对象。前端显示所有ClothCategory对象的表数据后，对ClothCategory对象进行的修改/删除/更新操作分别提交到`/clothCategory/add`和`/clothCategory/remove`以及`/clothCategory/update`，且在完成后重新向`/clothCategory/getAll`发送请求获得更新后的数据并刷新前端表数据。
## 第三阶段流程说明
- 服饰管理界面
  > 前端提取session中User对象的`identity`属性，判断是否为管理员，若是则可以修改服饰细目数据，表现形式为有`添加`服饰细目选项，支持`保存/删除`已有服饰细目。向后端`/cloth/search`发送数据
  ```json
    {
      "clothGender": "男",
      "clothCategoryName": "裤子"
    }
  ```
  > 后端将返回携带此筛选类别的数据，前端据此数据布置初始化界面。
  > - 添加服饰细目: 将数据提交到`/cloth/add`，此时并未选择服饰的图片，应该将`clothImagePath`的值设为`default.png`，注意使用相对路径(路径在`WebContent/images/data/suits/`)。后端会返回服饰细目的完整属性，包括属性`id`，虽然`id`并不显示在界面中，但是前端要保存`id`属性值。
  > - 更新服饰细目: 将数据提交到`/cloth/update`，当后端返回更新失败，即服饰名称重复时，前端应保存输入的数据，允许用户根据之前数据修改。
  > - 删除服饰细目: 将数据提交到`/cloth/remove`，此时后端会同步删除`WebContent/images/data/suits/`下的图片文件。
  > - 上传服饰图片: 将数据提交到`file/uploadClothImage`，后端返回的Result对象中的`description`的值为图片文件全名，如`test.png`
## 第四阶段流程说明
- 换衣间界面
  > 在用户切换到换衣间时，前端首先获取当前用户对应的已着装服饰列表(`List<DressedCloth>`)，详细步骤如下。向后端`/dressedClothes/getClothList`发送当前登录用户的User对象的`name`属性，后端将会返回包含用户的已着装服饰列表数据的Result对象。添加/删除用户的已着装服饰都需要将相应的已着装服饰对象发送到后端`/dressedClothes/add`和`/dressedClothes/remove`，而更新用户已着装服饰只允许更新已着装服饰的`zIndex`属性，将更新后的已着装服饰对象发送到`/dressedClothes/update`，对已着装服饰的添加/删除/更新操作，都要再向后端获得变更后的完整的用户已着装服饰列表，前端根据变更后的表数据更新界面。
- `/dressedClothes/getClothList`数据例子:
  ```json
    {
    "name": "张三"
    }
  ```
- `/dressedClothes/add`
  ```json
    {
      "belongUserName": "张三",
      "zIndex": 1,
      "id": 101,
      "clothID": "C001",
      "clothName": "时尚T恤",
      "clothPrice": 199.99,
      "clothGender": "男",
      "clothCategoryName": "上衣",
      "clothImageName": "fashion_tshirt.png"
    }
  ```
- `/dressedClothes/remove`:
  ```json
    {
      "belongUserName": "张三"
    }
  ```
- `/dressedClothes/update`:
  ```json
    {
      "belongUserName": "张三",
      "zIndex": 2000,
      "id": 101,
      "clothID": "C001",
      "clothName": "时尚T恤 - 新款",
      "clothPrice": 299.99,
      "clothGender": "男",
      "clothCategoryName": "上衣",
      "clothImageName": "fashion_tshirt_new.png"
    }
  ```