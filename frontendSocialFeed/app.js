angular.module("myApp", ["ngRoute",]).config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
      })
      .when("/about", {
        templateUrl: "views/about.html",
      })
      .when("/question", {
        templateUrl: "views/question.html",
      })
      .when("/share", {
        templateUrl: "views/share.html",
      })
      .when("/feed", {
        templateUrl: "views/feed.html",
        styleUrls: ["/css/index.css"],
        controller: "myCtr",
      })
      .otherwise({
        redirectTo: "home",
      });
  },
]);

angular.module("myApp").controller("myCtr", [
  "$scope",
  "$http",
  "postService",
  '$routeParams',
  function ($scope, $http, postService,$routeParams) {
    var vm = this;
    $scope.loading = false;
    $scope.loadingComments=false;
    $scope.loadingDelete=false;
    $scope.loadingDislike=false;
    $scope.loadinglike=false;
    $scope.askQuestionMode=false;
    $scope.showfirstOption=false;
    $scope.id = 0;
    $scope.show = false;
    $scope.showPollOption = false;
    $scope.showOption2 = false;
    $scope.showOption3 = false;
    $scope.showOption4 = false;
    $scope.askquestion = false;
    $scope.showSecondOption = false;
    $scope.allPosts = [];
    $scope.count = 0;
    $scope.temp;
    $scope.editMode = false;
    $scope.editModes = false;
    $scope.newComment = ""; // Initialize the new comment input
    $scope.showCommentInput = false; // Set initial state to show the comment input field
    $scope.userName = $routeParams.userName;
    $scope.description = $routeParams.description;
    $scope.postedTime=$routeParams.postedTime;
    getAllData();
    $scope.handleDataFromChild = function(data) {
      console.log('Data received from child:', data);
      getAllData();
    };

    // $scope.parseAndAssignComments = function(post) {
    //   post.comments = parseComments(post.comments);
    // };

    // function parseComments(commentsArray) {
    //   if (Array.isArray(commentsArray)) {
    //     return commentsArray.map(function(commentString) {
    //        parts = commentString.split(',');
    //       return {
    //         text: parts[0],
    //         id: parts[1],
    //         editMode: false
    //       };
    //     });
    //   } else {
    //     return [];
    //   }
    // }
    $scope.addOption = function() {
      if (!$scope.showOption2) {
        $scope.showOption2 = true;
      } else if (!$scope.showOption3) {
        $scope.showOption3 = true;
      }
      else if(!$scope.showOption4) {
        $scope.showOption4 = true;
      }
    };

    
    $scope.Edit = () => {
      if ($scope.editMode) {
        // Save changes
        $scope.editMode = false;
      } else {
        // Enter edit mode
        $scope.editMode = true;
      }
    };
   
    //cancel a add post
    $scope.CancelFeed = () => {
      $scope.askquestion = false;
      $scope.show = false;
      $scope.story = "";
      $scope.userName = "";
    };

    // adding a new post in feed
    $scope.addToFeed = () => {
      if (navigator.onLine) {
        $scope.loading = true;
      $scope.show = false;
      $scope.askquestion=false;
      const post = {
        userName: $scope.userName,
        description: $scope.story,
        type:"post",
      };
      
      //adding a post
      postService
        .createPost(post)
        .then(function (newPost) {
          console.log("Post added successfully:", newPost);
        
          $scope.story = "";
          $scope.userName = "";
          getAllData();
        })
        .catch(function (error) {
          console.error(error);
        })
      } else {
        alert("Application is offline. Please check your internet connection.");
      }
    };
    $scope.addQuestion = () => {
      if (navigator.onLine) {
        $scope.loading = true;
      $scope.show = false;
      $scope.askquestion=false;
      const post = {
        userName: $scope.userName,
        description: $scope.story,
        type:"question",
      };
     
      postService
        .createPost(post)
        .then(function (newPost) {
          console.log("Post added successfully:", newPost);
        
          $scope.story = "";
          $scope.userName = "";
          getAllData();
        })
        .catch(function (error) {
          console.error(error);
        })
      } else {
        alert("Application is offline. Please check your internet connection.");
      }
    };

 
     function getAllData() {
      if (navigator.onLine) {
      $scope.loading = true;
      postService
        .getAllData()
        .then(function (posts) {
          $scope.loading = false;
          $scope.allPosts = posts;
        })
        .catch(function (error) {
          console.error("Error retrieving data:", error);
        });
    }
    else {
      alert("Application is offline. Please check your internet connection.");
    }}
  },

  
]);
