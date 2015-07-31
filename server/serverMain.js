Meteor.methods({
    agg: function() {
      console.log("Aggregate Method -- START");

      results = Events.aggregate([{
        $group : {
            _id : "$name",
            new: { $sum: 1},
            count: { $sum: "$value"}
        }
      },
      {$out : "agg"}
      //outputting to collection does not trigger the meteor magic. Which would be ideal. $out seems to be the issue.

      ]);
      console.log("Aggregate Method -- END");

      //This section shows the workaround which is necessary.
      console.log("Persist agg -- START");
      Alternate.remove({});
      results.forEach(function(el){
        Alternate.insert({
          event: el._id,
          count: el.count,
          new: el.new
          })
        }
      );
      console.log("Persist agg -- END")
    }
});

Meteor.call('agg')
