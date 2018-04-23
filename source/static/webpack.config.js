const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry:__dirname + '/src/main.js',   //入口文件
    output:{
        path:__dirname + '/build',    //输出路径
        filename:'bundle.js'            //输出的文件名
    },
    devtool:"source-map",               //配置source Maps选项
    devServer:{                         //设置本地服务器
        contentBase:'./public',         //生成服务器的目录
        port:"9000",                    //端口号
        inline:true,                    //当源文件修改时要不要刷新页面
        historyApiFallback:true,        //HTML5中单页面应用
    },
    module:{
        loaders:[{                      //设置json-loader
            test:/\.json$/,             //loader处理的文件类型
            loader:"json-loader",       //需要用到的loader
            exclude:/node_modules/      //不包括的文件
        },{
            test:/\.(js|jsx)$/,               //babel
            loader:"babel-loader",
            exclude:/node_modules/
        },{
            test:/\.css$/,              //antdesign不需要模块
            loader:"style-loader!css-loader",
            include:/node_modules/
        },{
            test:/\.css$/,              //style-loader和css-loader
            loader:"style-loader!css-loader?modules",
            exclude:/node_modules/
        },{
           // 小于8KB的图片使用base64内联
           test: /\.(png|jpg)$/,
           loader: 'url-loader?limit=8192'
       }]
    },
    plugins:[                           //插件
        new HtmlWebpackPlugin({         //html-webpack-plugin
            template:__dirname + '/src/index.tmpl.html'
        })
    ]
}