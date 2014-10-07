  /*jshint eqnull:true, expr:true*/

  var _ = {};

  (function() {

    // Returns whatever value is passed as the argument. This function doesn't
    // seem very useful, but remember it--if a function needs to provide an
    // iterator when the user does not pass one in, this will be handy.
    _.identity = function(val) {
        return val;
    };

    /**
     * COLLECTIONS
     * ===========
     *
     * In this section, we'll have a look at functions that operate on collections
     * of values; in JavaScript, a 'collection' is something that can contain a
     * number of values--either an array or an object.
     *
     *
     * IMPORTANT NOTE!
     * ===========
     *
     * The .first function is implemented for you, to help guide you toward success
     * in your work on the following functions. Whenever you see a portion of the
     * assignment pre-completed, be sure to read and understand it fully before
     * you proceed. Skipping this step will lead to considerably more difficulty
     * implementing the sections you are responsible for.
     */

    // Return an array of the first n elements of an array. If n is undefined,
    // return just the first element.
    _.first = function(array, n) {
      return n === undefined ? array[0] : array.slice(0, n);
    };

    // Like first, but for the last elements. If n is undefined, return just the
    // last element.
    _.last = function(array, n) {
        if(n === 0) return []; 
        return n === undefined ? array[array.length-1] : array.slice(-n);
    };

    // Call iterator(value, key, collection) for each element of collection.
    // Accepts both arrays and objects.

    // Note: _.each does not have a return value, but rather simply runs the
    // iterator function over each item in the input collection.
    _.each = function(collection, iterator) {
      if(Array.isArray(collection)){
        for(var i = 0; i < collection.length; i++){
          iterator(collection[i],i,collection);
        }
      } else {
        for(var key in collection){
          if(collection.hasOwnProperty(key)){
            iterator(collection[key],key,collection);
          }
        }
      }
    };

    // Returns the index at which value can be found in the array, or -1 if value
    // is not present in the array.
    _.indexOf = function(array, target){
      // TIP: Here's an example of a function that needs to iterate, which we've
      // implemented for you. Instead of using a standard `for` loop, though,
      // it uses the iteration helper `each`, which you will need to write.
      var result = -1;

      _.each(array, function(item, index) {
        if (item === target && result === -1) {
          result = index;
        }
      });

      return result;
    };

    // By default, returns all elements of an array that pass a truth test.
    // Pass "false" as a third argument to instead return all elements that FAIL the test.
    _.filter = function(collection, test, state=true) {
      var result = [];
      for (var i = 0; i < collection.length; i++) {
        if(test(collection[i])===state) { result.push(collection[i]); }
      }
      return result;
    };

    // Return all elements of an array that don't pass a truth test.
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it 
    _.reject = function(collection, test) {
      return _.filter(collection, test, false);

    };

    // Produce a duplicate-free version of the array.
    _.uniq = function(array) {
      array.sort();
      var uniqs = [];
      for (var i = 0; i < array.length; i++) {
        if(array[i] != uniqs[uniqs.length-1]) uniqs.push(array[i]); 
      }
      return uniqs;
    };

    

    // Return the results of applying an iterator to each element.
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    _.map = function(collection, iterator) {
      var results = [];
      for (var i = 0; i < collection.length; i++) {
        results.push(iterator(collection[i]));
      }
      return results;
    };


    //
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    //

    // Takes an array of objects and returns and array of the values of
    // a certain property in it. E.g. take an array of people and return
    // an array of just their ages
    _.pluck = function(collection, key) {
      // TIP: map is really handy when you want to transform an array of
      // values into a new array of values. _.pluck() is solved for you
      // as an example of this.
      return _.map(collection, function(item){
        return item[key];
      });
    };


    // Calls the method named by functionOrKey on each value in the list.
    // Note: you will nead to learn a bit about .apply to complete this.
    _.invoke = function(collection, functionOrKey, args) {                                                              
      return _.map(collection, function(value) {
        if(typeof(functionOrKey)==="function"){
          return(functionOrKey.apply(value,args));
        } else {
          return((value[functionOrKey]).apply(value,args));
        }

        //iterate over the collection by applying this function to all values:
        //if functionOrKey is a function, just use it in the function place for map.
        //if functionOrKey is a key, then search for that key WITHIN this element of the object-being-mapped.
        //so now you have the passed-in function, or you have an element that was looked up by key.
        //either way, 
      });
    };







    // Reduces an array or object to a single value by repetitively calling
    // iterator(previousValue, item) for each item. previousValue should be
    // the return value of the previous iterator call.
    //
    // You can pass in an initialValue that is passed to the first iterator
    // call. If initialValue is not explicitly passed in, it should default to the
    // first element in the collection.
    //
    // Example:
    //   var numbers = [1,2,3];
    //   var sum = _.reduce(numbers, function(total, number){
    //     return total + number;
    //   }, 0); // should be 6
    _.reduce = function(collection, iterator, accumulator=collection[0]) {
      _.each(collection,function(item){
        accumulator = iterator(accumulator, item);
      });
      return accumulator;
    };



    // Determine if the array or object contains a given value (using `===`).
    _.contains = function(collection, target) {
      return _.reduce(collection,function(accumulator,item){return accumulator || item===target},false);
    };


    // Determine whether all of the elements match a truth test.
    // if the optional parameter "invert" is true, the function checks for "none" rather than "every."
   
    _.every = function(collection, iterator=_.identity, invert=false) {                         
        for (var i = 0; i < collection.length; i++) {
          if(iterator(collection[i]) ? invert : !invert){
            return false;
          }; 
        } 
        return true;
    };
    

    // Determine whether any of the elements pass a truth test. If no iterator is
    // provided, provide a default one
    // TIP: There's a very clever way to re-use every() here.                                 
    _.some = function(collection, iterator) {
      if( _.every(collection, iterator, true)) return false;
      else return true;
    };
    

    /**
     * OBJECTS
     * =======
     *
     * In this section, we'll look at a couple of helpers for merging objects.
     */

    // Extend a given object with all the properties of the passed in
    // object(s).
    //
    // Example:
    //   var obj1 = {key1: "something"};
    //   _.extend(obj1, {
    //     key2: "something new",
    //     key3: "something else new"
    //   }, {
    //     bla: "even more stuff"
    //   }); // obj1 now contains key1, key2, key3 and bla
    _.extend = function(obj) {
      for (var i = 0; i < arguments.length; i++) {
        _.each(arguments[i], function(item, key, collection){
          obj[key] = item;
        });
      }
      return obj;
      };

    // Like extend, but doesn't ever overwrite a key that already
    // exists in obj
    _.defaults = function(obj) {
      for (var i = 0; i < arguments.length; i++) {
        _.each(arguments[i], function(item, key, collection){
          if(!obj.hasOwnProperty(key)) obj[key] = item;
        });
      }
      return obj;
      };


    /**
     * FUNCTIONS
     * =========
     *
     * Now we're getting into function decorators, which take in any function
     * and return out a new version of the function that works somewhat differently
     */

    // Return a function that can be called at most one time. Subsequent calls
    // should return the previously returned value.
    _.once = function(func) {
      // TIP: These variables are stored in a "closure scope" (worth researching),
      // so that they'll remain available to the newly-generated function every
      // time it's called.
      var alreadyCalled = false;
      var result;

      // TIP: We'll return a new function that delegates to the old one, but only
      // if it hasn't been called before.
      return function() {
        if (!alreadyCalled) {
          // TIP: .apply(this, arguments) is the standard way to pass on all of the
          // information from one function call to another.
          result = func.apply(this, arguments);
          alreadyCalled = true;
        }
        // The new function always returns the originally computed result.
        return result;
      };
    };

    // Memoize an expensive function by storing its results. You may assume
    // that the function takes only one argument and that it is a primitive.
    //
    // _.memoize should return a function that when called, will check if it has
    // already computed the result for the given argument and return that value
    // instead if possible.
    _.memoize = function(func) {
      var resultsTable = {};
      return function(value){
        if(!resultsTable.hasOwnProperty(value)){
          resultsTable[value] = func.apply(this,arguments);
        }
        return resultsTable[value];
      };
    };


    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    //
    // The arguments for the original function are passed after the wait
    // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
    // call someFunction('a', 'b') after 500ms
    _.delay = function(func, wait) {                                                  
      var args = Array.prototype.slice.call(arguments, 2);
      return setTimeout(function(){
        return func.apply(null, args);                                               
      }, wait);
    };


    /**
     * ADVANCED COLLECTION OPERATIONS
     * ==============================
     */

    // Randomizes the order of an array's contents.
    //
    // TIP: This function's test suite will ask that you not modify the original
    // input array. For a tip on how to make a copy of an array, see:
    // http://mdn.io/Array.prototype.slice
    _.shuffle = function(array) {
      var copy = array.slice();
      for (var i = 0; i < copy.length*3; i++) {
        var index1 = Math.floor(Math.random()*copy.length);
        var index2 = Math.floor(Math.random()*copy.length);
        var temp = copy[index1];
        copy[index1] = copy[index2];
        copy[index2] = temp;
      }
      return copy;
    };


    /**
     * Note: This is the end of the pre-course curriculum. Feel free to continue,
     * but nothing beyond here is required.
     */


    // Sort the object's values by a criterion produced by an iterator.
    // If iterator is a string, sort objects by that property with the name
    // of that string. For example, _.sortBy(people, 'name') should sort
    // an array of people by their name.
    _.sortBy = function(collection, iterator) {

      function swap(collection, a, b){
        var temp = collection[a];
        collection[a]=collection[b];
        collection[b]=temp;
      }

      function sort(collection, iterator){
        for (var i = 1; i < collection.length; i++) {
          if(iterator(collection[i])<iterator(collection[i-1]) || collection[i-1]==undefined){
            swap(collection,i,i-1);
            var j = i-1;
            while(j > 0 && (iterator(collection[j])<iterator(collection[j-1]) || collection[j-1]==undefined)) {
              swap(collection,j,j-1);
              j -=1;
            } 
          }
        }
      }

      if(typeof(iterator)==="function"){ 
        sort(collection,iterator)
      } else if(typeof(iterator)==="string"){
        sort(collection,function(elem){
          return elem[iterator];
        });
      }

      return collection;
    };








    _.quickSort = function(collection){

      //this will be an implementation of quicksort.  
      //first: choose a pivot value.
      function getPivotIndex(start, stop){
        return Math.floor(Math.random()*(stop-start+1)+start);
        //return start;
      }

      function swap(collection, a, b){
        //debug("swapping " + collection[a] + " and " + collection[b]);

        var temp = collection[a];
        collection[a]=collection[b];
        collection[b]=temp;
        //debug(collection); 
      }

      function sortSubsection(collection, start, stop){
        var pivotIndex = getPivotIndex(start, stop);
        var i = start;
        var pivotValue = collection[pivotIndex];
        //debug("Now sorting subsection of elements "+ start + " to " + stop + " with pivot value " + pivotValue);
        //debug(collection);
        
        swap(collection, pivotIndex, stop);
        for (var i = start; i < stop; i++) {
          if(collection[i]<pivotValue){
            swap(collection, i, i);
            i += 1;
          } //else {
            //debug("NOT swapping "+collection[i] + " and " + collection[i] + " because " + collection[i] + " is not smaller than " + pivotValue);
          //}
        }
        //debug("Done with with subsection call... putting the pivot in its place.");
        swap(collection, stop, i);
        //debug(" ");
        
        if(i - start>1){
          sortSubsection(collection,start,i-1);
        }
        if(stop - i >1){
          sortSubsection(collection,i+1,stop);
        }
      }

      sortSubsection(collection,0,collection.length-1);
      return collection;

    };



    // Zip together two or more arrays with elements of the same index
    // going together.
    //
    // Example:
    // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
    _.zip = function() {
      var result = [];
      
      //establish length of longest array.  this is how many times we'll iterate.
      var maxLength = 0;
      for (var i = 0; i < arguments.length; i++) {
        maxLength = Math.max(arguments[i].length,maxLength);
      };

      //nested loop to collect elements index-by-index from all the arrays entered as arguments.
      for (var k = 0; k < maxLength; k++) {
        var innerArray = [];
        for (var j = 0; j < arguments.length; j++) {
          innerArray.push(arguments[j][k])
        }
        result.push(innerArray);
      }

      return result;
    };

    // Takes a multidimensional array and converts it to a one-dimensional array.
    // The new array should contain all elements of the multidimensional array.
    //
    // Hint: Use Array.isArray to check if something is an array
    _.flatten = function(nestedArray, result) {
      var flattened = []
      function permute(elem){
        if (Array.isArray(elem)){
          for (var i = 0; i < elem.length; i++) {
            permute(elem[i]);
          }
        } else {
          flattened.push(elem);
        }
      }

      for (var i = 0; i < nestedArray.length; i++) {
        permute(nestedArray[i]);
      }
      return flattened;
    };

    // Takes an arbitrary number of arrays and produces an array that contains
    // every item shared between all the passed-in arrays.
    _.intersection = function() {
      var result = [];
      var arrs = []; 
      for (var i = 0; i < arguments.length; i++) {
        arrs[i] = arguments[i]; 
      }
      _.each(arrs[0],function(elem){
        if(_.every(arrs,function(arr){return _.contains(arr,elem) })) {
          result.push(elem);
        }
      });
      return result;
  }; 




    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = function(array) {
      var result = [];
      var mainArr = arguments[0];
      var otherArrs = []; 
      for (var i = 1; i < arguments.length; i++) {
        otherArrs[i] = arguments[i];
        }
      _.each(mainArr,function(elem){
        if(!_.some(otherArrs,function(arr){return _.contains(arr,elem)})) {
          result.push(elem);
        }
      })
      return result; 
    };

  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.

  _.throttle = function(func, wait) {
    var lastCalled = 0;
    var scheduled = 0;
    var lastResult = null;

    return function(){
      var args = Array.prototype.slice.call(arguments,0);

      //case: if enough time has elapsed since the function last ran, run it immediately.
      if(lastCalled + wait <= Date.now()){
        lastCalled = Date.now();
        lastResult = func.apply(null,args);
        return lastResult;

      //case: if not enough time has elapsed, AND if there is not a scheduled call already pending, then schedule a call. also return most recent result.
      } else if(Date.now() > scheduled){
        scheduled = lastCalled + wait;
        setTimeout(
          function() { 
            lastCalled = Date.now();
            lastResult = func.apply(null,args)
            return lastResult;
          }, lastCalled + wait - Date.now());
        return lastResult;
      
      //case: future call already scheduled.  just return most recent result.
      } else {
        return lastResult;
      }
    };
  };
}).call(this);
