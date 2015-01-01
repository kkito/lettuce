var PostLink = React.createClass({
    render: function(){
        return <li><a href={this.props.url}>{this.props.title}</a></li>;
    }
})

var PagePostLinks = React.createClass({
    render: function(){
        var links = this.props.posts.map(function(post){
            return <PostLink url={post.url} title={post.title} />
        })
        return <ul>{links}</ul>
    }
})

var IndexPosts = React.createClass({
    maxSize: 20,
    groupPosts: function(){
        var result  = []
        var posts = this.props.posts;
        for(var i = 0 ; i < posts.length ; i += this.maxSize) {
            result.push(posts.slice(i , i + this.maxSize))
        }
        return result;
    },
    render: function(){
        var pages = this.groupPosts().map(function(posts){
            return <PagePostLinks posts={posts} />
        })
        return <div>{pages}</div>
    }
})

// React.render(
//     <h1>Hello, world!<PagePostLinks posts={[{url: "wfe" , title:"1222"} , {url: "232" , title: "ggg"}]} /></h1>,
//     document.getElementById('example')
// );

