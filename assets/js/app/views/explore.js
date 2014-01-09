$(function() {
    var TweetList = MeiweiApp.CollectionView.extend({
        ModelView: MeiweiApp.ModelView.extend({
            template: TPL['tweet-box'],
            className: 'tweet-list-item well well-xs',
            initModelView: function() {
                var self = this;
                this.$el.hammer().on('tap', 'footer', function(e) {
                    var webView = new steroids.views.PreviewFileView("/assets/img/avatars/5.jpg");
                    steroids.modal.show(webView);
                });
            }
        })
    });
    
    MeiweiApp.Pages.Explore = new (MeiweiApp.PageView.extend({
    	events: {
    		
    	},
    	initPage: function() {
    	    steroids.view.navigationBar.show("发现吐槽");
    	    this.initButtons();
    	    this.tweets = new MeiweiApp.Collections.Tweets();
    		this.views = {
    		    tweetList: new TweetList({ collection: this.tweets, el: this.$('.tweet-list') })
    		};
    	},
        initButtons: function() {
            var rightButton = new steroids.buttons.NavigationBarButton();
            rightButton.onTap = function() { };
            rightButton.imagePath = "/assets/img/icons/search@2x.png";
            steroids.view.navigationBar.setButtons({
                right : [rightButton]
            });
        },
        onVisibilityChange: function() {
            if (document.hidden) {
                this.$('.tweet-list-item').addClass('invisible');
            } else {
                this.$('.tweet-list-item').removeClass('invisible');
            }
        },
    	render: function() {
	        this.tweets.reset(INSTANCE.tweets);
    	}
    }))({el: $("#view-explore")});
});
