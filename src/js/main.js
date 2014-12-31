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

// React.render(
//     <h1>Hello, world!<PagePostLinks posts={[{url: "wfe" , title:"1222"} , {url: "232" , title: "ggg"}]} /></h1>,
//     document.getElementById('example')
// );

