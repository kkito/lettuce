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
        var theClass = "page-" + this.props.page;
        if(theClass == "page-1") {
            theClass += " current";
        }
        return <ul className={theClass}>{links}</ul>
    }
})

var PageIndex = React.createClass({
    render: function(){
        return <li onClick={this.props.clickHandler.bind(this , this.props.pageNumber)}>{this.props.pageNumber}</li>
    }
})

var PageIndexs = React.createClass({
    offsetKeepSize: 3,
    getInitialState: function() {
        return {currentPage: this.props.currentPage};
    },
    indexClickHandler: function(i) {
        this.setState({currentPage: i});
        this.props.clickHandler(i)
    },
    render: function(){
        var indexs = [];
        for(var i = 0 ; i < this.props.pageSize ; i++){
            var isBesides = this.offsetKeepSize > i || this.offsetKeepSize + i + 1 > this.props.pageSize;
            var isCurrent = ((i+1) == this.state.currentPage);
            var isBesideCurrent = Math.abs(this.state.currentPage - i - 1) < this.offsetKeepSize;
            if(isBesides || isBesideCurrent) {
                indexs.push(<PageIndex className={isCurrent ? "current" : ""} pageNumber={i + 1} clickHandler={this.indexClickHandler}/>)
            }else {
                indexs.push(<li className="omit">.</li>)
            }
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
        $(".pages ul").removeClass("current");
        $(".page-" + i).addClass("current");
    },
    render: function(){
        var pages = this.groupPosts().map(function(posts , idx){
            return <PagePostLinks posts={posts} page={idx+1}/>
        })
        return <div className="post-list"><div className="pages">{pages}</div><PageIndexs pageSize={pages.length} currentPage={1} clickHandler={this.indexClickHandler}/></div>
    }
})

// React.render(
//     <h1>Hello, world!<PagePostLinks posts={[{url: "wfe" , title:"1222"} , {url: "232" , title: "ggg"}]} /></h1>,
//     document.getElementById('example')
// );

