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
        return <ul className={"page-" + this.props.page}>{links}</ul>
    }
})

var PageIndex = React.createClass({
    render: function(){
        return <li onClick={this.props.clickHandler.bind(this , this.props.pageNumber)}>{this.props.pageNumber}</li>
    }
})

var PageIndexs = React.createClass({
    render: function(){
        var indexs = []
        for(var i = 0 ; i < this.props.pageSize ; i++){
            indexs.push(<PageIndex pageNumber={i + 1} clickHandler={this.props.clickHandler}/>)
        }
        return <ul className="idx">{indexs}</ul>
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
    indexClickHandler: function(i) {
        console.log("this " + i + " is clicked");
    },
    render: function(){
        var pages = this.groupPosts().map(function(posts , idx){
            return <PagePostLinks posts={posts} page={idx+1}/>
        })
        return <div className="post-list"><div className="pages">{pages}</div><PageIndexs pageSize={pages.length} clickHandler={this.indexClickHandler}/></div>
    }
})

// React.render(
//     <h1>Hello, world!<PagePostLinks posts={[{url: "wfe" , title:"1222"} , {url: "232" , title: "ggg"}]} /></h1>,
//     document.getElementById('example')
// );

