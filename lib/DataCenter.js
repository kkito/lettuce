var Sequelize = require('sequelize');
var DataCenter = {}
DataCenter.getBlogs = function() {
    var sequelize = new Sequelize('', 'username', 'password', {
        dialect: "sqlite",
        storage: "blog.db"
    })

    var Post = sequelize.define("article" , {
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        category: Sequelize.STRING,
        state: Sequelize.INTEGER,
        recordtime: Sequelize.DATE
    }, {
        tableName: "article",
        timestamps: false,
    })
    // return sequelize
    // // .sync({ force: true })
    // .sync()
    // .complete(function(err) {
    //     if (!!err) {
    //         console.log('An error occurred while creating the table:', err)
    //     } else {
    //         console.log('It worked!')
    //         // createUser();
    //         return Post.findAll()
    //     }
    // })
    return Post.findAll()

}
module.exports = DataCenter;
