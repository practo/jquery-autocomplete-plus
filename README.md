jquery-autocomplete-plus
========================

jQueryAutocompletePlus is a simple plugin which gives your input feild a Facebook/Twitter like autocompletion superpowers. It allows you to define a trigger and show results when typed

 * @ for Searching people</li>
 * # for Searching tags</li>
 * $ for Stock Companies</li>
 * or whatever you can imagine of...</li>


Try it [here](http://www.markdownviewer.com/)

Steps to use: 

### Add the Required files

      <link rel="stylesheet" type="text/css" href="jquery-ui.css">
      <script type="text/javascript" src="jquery.js"></script>
      <script type="text/javascript" src="jquery-ui.css"></script>
      <script type="text/javascript" src="jqueryautocompleteplus.js"></script>


### Add the data points

    var people = [
      {
          value: "Voldemort",
          label: "tom.riddle@hogwards.edu",
      },
      {
          value: "Bruce Wayne",
          label: "batman@wayne.com",
      },
      {
          value: "Tony",
          label: "iamironman@stark.com",
      }
      ];
  
      var hashTags = [
      {
          value: "potterhead",
          label: "potterhead"
      },
      {
          value: "marvel",
          label: "potterhead"
      },
      {
          value: "DcComics",
          label: "potterhead"
      }
    ];                 
   
### Add your options

    $('.myTextarea').jqueryautocompleteplus({
       trigger1: "@",
       outputTrigger1: false,
       minLength1: 2,
       data1: people,   
       trigger2: "#",
       outputTrigger2: true,
       minLength2: 3,
       data2: hashTags
    });
       

Currently jqueryAutocompletePlus supports only two (in number) triggers. But its so easy that you can easily make it work for more triggers. For each trigger, there are a set of parameters needed. Here is a descriptions of each one of them.
