const sampleQuestions = [
    {
        "title": "Reverse String",
        "complexity": "easy",
        "categories": ["Two Pointers", "String", "Algorithms"],
        "link": "https://leetcode.com/problems/reverse-string/",
        "description": "Write a function that reverses a string. The input string is given as an array of characters `s`.<br><br>You must do this by modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm) with `O(1)` extra memory.<br><br><br><br>**Example 1:** <br>**Input:**  s = [\"h\",\"e\",\"l\",\"l\",\"o\"]<br>**Output:**  [\"o\",\"l\",\"l\",\"e\",\"h\"]<br><br>**Example 2:** <br>**Input:**  s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]<br>**Output:**  [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]<br><br><br>**Constraints:** <br>* `1 <= s.length <= 105`<br>* `s[i]` is a [printable ascii character](https://en.wikipedia.org/wiki/ASCII#Printable_characters).<br><br>"
    },{
        "title": "Linked List Cycle",
        "complexity": "easy",
        "categories": ["Hash Table", "Linked List", "Two Pointers", "Algorithms"],
        "link": "https://leetcode.com/problems/linked-list-cycle/",
        "description": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.<br><br>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the`next`pointer. Internally, `pos`is used to denote the index of the node thattail's`next`pointer is connected to.**Note that`pos`is not passed as a parameter**.<br><br>Return`true` *if there is a cycle in the linked list*. Otherwise, return `false`.<br><br><br><br>**Example 1:** <br>![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)<br>**Input:**  head = [3,2,0,-4], pos = 1<br>**Output:**  true<br>**Explanation:**  There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).<br><br>**Example 2:** <br>![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)<br>**Input:**  head = [1,2], pos = 0<br>**Output:**  true<br>**Explanation:**  There is a cycle in the linked list, where the tail connects to the 0th node.<br><br>**Example 3:** <br>![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)<br>**Input:**  head = [1], pos = -1<br>**Output:**  false<br>**Explanation:**  There is no cycle in the linked list.<br><br><br>**Constraints:** <br>* The number of the nodes in the list is in the range `[0, 104]`.<br>* `-105 <= Node.val <= 105`<br>* `pos` is `-1` or a **valid index** in the linked-list.<br><br><br>**Follow up:**  Can you solve it using `O(1)` (i.e. constant) memory?<br><br>"
    },{
        "title": "Roman to Integer",
        "complexity": "easy",
        "categories": ["Hash Table", "Math", "String", "Algorithms"],
        "link": "https://leetcode.com/problems/roman-to-integer/",
        "description": "Roman numerals are represented by seven different symbols:`I`, `V`, `X`, `L`, `C`, `D` and `M`.<br><br>**Symbol**       **Value**<br>I             1<br>V             5<br>X             10<br>L             50<br>C             100<br>D             500<br>M             1000<br><br>For example,`2` is written as `II`in Roman numeral, just two ones added together. `12` is written as`XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.<br><br>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:<br><br>* `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.<br>* `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.<br>* `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.<br><br>Given a roman numeral, convert it to an integer.<br><br><br><br>**Example 1:** <br>**Input:**  s = \"III\"<br>**Output:**  3<br>**Explanation:**  III = 3.<br><br>**Example 2:** <br>**Input:**  s = \"LVIII\"<br>**Output:**  58<br>**Explanation:**  L = 50, V= 5, III = 3.<br><br>**Example 3:** <br>**Input:**  s = \"MCMXCIV\"<br>**Output:**  1994<br>**Explanation:**  M = 1000, CM = 900, XC = 90 and IV = 4.<br><br><br>**Constraints:** <br>* `1 <= s.length <= 15`<br>* `s` contains onlythe characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.<br>* It is **guaranteed**that `s` is a valid roman numeral in the range `[1, 3999]`.<br><br>"
    },{
        "title": "Add Binary",
        "complexity": "easy",
        "categories": ["Math", "String", "Bit Manipulation", "Simulation", "Algorithms"],
        "link": "https://leetcode.com/problems/add-binary/",
        "description": "Given two binary strings `a` and `b`, return *their sum as a binary string*.<br><br><br><br>**Example 1:** <br>**Input:**  a = \"11\", b = \"1\"<br>**Output:**  \"100\"<br><br>**Example 2:** <br>**Input:**  a = \"1010\", b = \"1011\"<br>**Output:**  \"10101\"<br><br><br>**Constraints:** <br>* `1 <= a.length, b.length <= 104`<br>* `a` and `b` consistonly of `'0'` or `'1'` characters.<br>* Each string does not contain leading zeros except for the zero itself.<br><br>"
    },{
        "title": "Repeated DNA Sequences",
        "complexity": "medium",
        "categories": ["Hash Table", "String", "Bit Manipulation", "Sliding Window", "Rolling Hash", "Hash Function", "Algorithms"],
        "link": "https://leetcode.com/problems/repeated-dna-sequences/",
        "description": "The **DNA sequence** is composed of a series of nucleotides abbreviated as `'A'`, `'C'`, `'G'`, and `'T'`.<br><br>* For example, `\"ACGAATTCCG\"` is a **DNA sequence**.<br><br>When studying **DNA**, it is useful to identify repeated sequences within the DNA.<br><br>Given a string `s` that represents a **DNA sequence**, return all the **`10`-letter-long** sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in **any order**.<br><br><br><br>**Example 1:** <br>**Input:**  s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"<br>**Output:**  [\"AAAAACCCCC\",\"CCCCCAAAAA\"]<br><br>**Example 2:** <br>**Input:**  s = \"AAAAAAAAAAAAA\"<br>**Output:**  [\"AAAAAAAAAA\"]<br><br><br>**Constraints:** <br>* `1 <= s.length <= 105`<br>* `s[i]` is either `'A'`, `'C'`, `'G'`, or `'T'`.<br><br>"
    },{
        "title": "Course Schedule",
        "complexity": "medium",
        "categories": ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort", "Algorithms"],
        "link": "https://leetcode.com/problems/course-schedule/",
        "description": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.<br><br>* For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.<br><br>Return `true` if you can finish all courses. Otherwise, return `false`.<br><br><br><br>**Example 1:** <br>**Input:**  numCourses = 2, prerequisites = [[1,0]]<br>**Output:**  true<br>**Explanation:**  There are a total of 2 courses to take. <br>To take course 1 you should have finished course 0. So it is possible.<br><br>**Example 2:** <br>**Input:**  numCourses = 2, prerequisites = [[1,0],[0,1]]<br>**Output:**  false<br>**Explanation:**  There are a total of 2 courses to take. <br>To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.<br><br><br>**Constraints:** <br>* `1 <= numCourses <= 2000`<br>* `0 <= prerequisites.length <= 5000`<br>* `prerequisites[i].length == 2`<br>* `0 <= ai, bi < numCourses`<br>* All the pairs prerequisites[i] are **unique**.<br><br>"
    },{
        "title": "Sliding Window Maximum",
        "complexity": "hard",
        "categories": ["Array", "Queue", "Sliding Window", "Heap (Priority Queue)", "Monotonic Queue", "Algorithms"],
        "link": "https://leetcode.com/problems/sliding-window-maximum/",
        "description": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.<br><br>Return *the max sliding window*.<br><br><br><br>**Example 1:** <br>**Input:**  nums = [1,3,-1,-3,5,3,6,7], k = 3<br>**Output:**  [3,3,5,5,6,7]<br>**Explanation:**  <br>Window position                Max<br>---------------               -----<br>[1  3  -1] -3  5  3  6  7       **3**<br> 1 [3  -1  -3] 5  3  6  7       **3**<br> 1  3 [-1  -3  5] 3  6  7       **5**<br> 1  3  -1 [-3  5  3] 6  7       **5**<br> 1  3  -1  -3 [5  3  6] 7       **6**<br> 1  3  -1  -3  5 [3  6  7]      **7**<br><br>**Example 2:** <br>**Input:**  nums = [1], k = 1<br>**Output:**  [1]<br><br><br>**Constraints:** <br>* `1 <= nums.length <= 105`<br>* `-104 <= nums[i] <= 104`<br>* `1 <= k <= nums.length`<br><br>"
    },{
        "title": "N-Queens",
        "complexity": "hard",
        "categories": ["Array", "Backtracking", "Algorithms"],
        "link": "https://leetcode.com/problems/n-queens/",
        "description": "The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.<br><br>Given an integer `n`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.<br><br>Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.<br><br><br><br>**Example 1:** <br>![](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)<br>**Input:**  n = 4<br>**Output:**  [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]<br>**Explanation:**  There exist two distinct solutions to the 4-queens puzzle as shown above<br><br>**Example 2:** <br>**Input:**  n = 1<br>**Output:**  [[\"Q\"]]<br><br><br>**Constraints:** <br>* `1 <= n <= 9`<br><br>"
    }
];

export default sampleQuestions;