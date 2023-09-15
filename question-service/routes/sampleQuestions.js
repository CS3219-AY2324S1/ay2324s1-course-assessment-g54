const sampleQuestions = [
    {
        "title": "Reverse String",
        "complexity": "easy",
        "categories": [
            "Two Pointers",
            "String",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/reverse-string/",
        "description": "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm) with `O(1)` extra memory.\n\n**Example 1:**\n**Input:** s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\n**Output:** [\"o\",\"l\",\"l\",\"e\",\"h\"]\n\n**Example 2:**\n**Input:** s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]\n**Output:** [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]\n\n**Constraints:**\n* `1 <= s.length <= 105`\n* `s[i]` is a [printable ascii character](https://en.wikipedia.org/wiki/ASCII#Printable_characters).\n\n"
    },
    {
        "title": "Linked List Cycle",
        "complexity": "easy",
        "categories": [
            "Hash Table",
            "Linked List",
            "Two Pointers",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/linked-list-cycle/",
        "description": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the`next`pointer. Internally, `pos`is used to denote the index of the node thattail's`next`pointer is connected to.**Note that`pos`is not passed as a parameter**.\n\nReturn`true` *if there is a cycle in the linked list*. Otherwise, return `false`.\n\n**Example 1:**\n![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)\n\n**Input:** head = [3,2,0,-4], pos = 1\n**Output:** true\n**Explanation:** There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n\n**Example 2:**\n![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)\n\n**Input:** head = [1,2], pos = 0\n**Output:** true\n**Explanation:** There is a cycle in the linked list, where the tail connects to the 0th node.\n\n**Example 3:**\n![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)\n\n**Input:** head = [1], pos = -1\n**Output:** false\n**Explanation:** There is no cycle in the linked list.\n\n**Constraints:**\n* The number of the nodes in the list is in the range `[0, 104]`.\n* `-105 <= Node.val <= 105`\n* `pos` is `-1` or a **valid index** in the linked-list.\n\n**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?\n\n"
    },
    {
        "title": "Roman to Integer",
        "complexity": "easy",
        "categories": [
            "Hash Table",
            "Math",
            "String",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/roman-to-integer/",
        "description": "Roman numerals are represented by seven different symbols:`I`, `V`, `X`, `L`, `C`, `D` and `M`.\n\n\n**Symbol**       **Value**\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example,`2` is written as `II`in Roman numeral, just two ones added together. `12` is written as`XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:\n\n* `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.\n* `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.\n* `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.\n\n**Example 1:**\n**Input:** s = \"III\"\n**Output:** 3\n**Explanation:** III = 3.\n\n**Example 2:**\n**Input:** s = \"LVIII\"\n**Output:** 58\n**Explanation:** L = 50, V= 5, III = 3.\n\n**Example 3:**\n**Input:** s = \"MCMXCIV\"\n**Output:** 1994\n**Explanation:** M = 1000, CM = 900, XC = 90 and IV = 4.\n\n**Constraints:**\n* `1 <= s.length <= 15`\n* `s` contains onlythe characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.\n* It is **guaranteed**that `s` is a valid roman numeral in the range `[1, 3999]`.\n\n"
    },
    {
        "title": "Add Binary",
        "complexity": "easy",
        "categories": [
            "Math",
            "String",
            "Bit Manipulation",
            "Simulation",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/add-binary/",
        "description": "Given two binary strings `a` and `b`, return *their sum as a binary string*.\n\n**Example 1:**\n**Input:** a = \"11\", b = \"1\"\n**Output:** \"100\"\n\n**Example 2:**\n**Input:** a = \"1010\", b = \"1011\"\n**Output:** \"10101\"\n\n**Constraints:**\n* `1 <= a.length, b.length <= 104`\n* `a` and `b` consistonly of `'0'` or `'1'` characters.\n* Each string does not contain leading zeros except for the zero itself.\n\n"
    },
    {
        "title": "Fibonacci Number",
        "complexity": "easy",
        "categories": [
            "Math",
            "Dynamic Programming",
            "Recursion",
            "Memoization",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/fibonacci-number/",
        "description": "The **Fibonacci numbers**, commonly denoted `F(n)` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from `0` and `1`. That is,\n\n\nF(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n > 1.\n\nGiven `n`, calculate `F(n)`.\n\n**Example 1:**\n**Input:** n = 2\n**Output:** 1\n**Explanation:** F(2) = F(1) + F(0) = 1 + 0 = 1.\n\n**Example 2:**\n**Input:** n = 3\n**Output:** 2\n**Explanation:** F(3) = F(2) + F(1) = 1 + 1 = 2.\n\n**Example 3:**\n**Input:** n = 4\n**Output:** 3\n**Explanation:** F(4) = F(3) + F(2) = 2 + 1 = 3.\n\n**Constraints:**\n* `0 <= n <= 30`\n\n"
    },
    {
        "title": "Implement Stack using Queues",
        "complexity": "easy",
        "categories": [
            "Stack",
            "Design",
            "Queue",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/implement-stack-using-queues/",
        "description": "Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).\n\nImplement the `MyStack` class:\n\n* `void push(int x)` Pushes element x to the top of the stack.\n* `int pop()` Removes the element on the top of the stack and returns it.\n* `int top()` Returns the element on the top of the stack.\n* `boolean empty()` Returns `true` if the stack is empty, `false` otherwise.\n\n**Notes:**\n* You must use **only** standard operations of a queue, which means that only `push to back`, `peek/pop from front`, `size` and `is empty` operations are valid.\n* Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.\n\n**Example 1:**\n**Input**\n[\"MyStack\", \"push\", \"push\", \"top\", \"pop\", \"empty\"]\n[[], [1], [2], [], [], []]\n**Output**\n[null, null, null, 2, 2, false]\n**Explanation**\nMyStack myStack = new MyStack();\nmyStack.push(1);\nmyStack.push(2);\nmyStack.top(); // return 2\nmyStack.pop(); // return 2\nmyStack.empty(); // return False\n\n**Constraints:**\n* `1 <= x <= 9`\n* At most `100` calls will be made to `push`, `pop`, `top`, and `empty`.\n* All the calls to `pop` and `top` are valid.\n\n**Follow-up:** Can you implement the stack using only one queue?\n\n"
    },
    {
        "title": "Combine Two Tables",
        "complexity": "easy",
        "categories": [
            "Database"
        ],
        "link": "https://leetcode.com/problems/combine-two-tables/",
        "description": "Table: `Person`\n\n\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| personId    | int     |\n| lastName    | varchar |\n| firstName   | varchar |\n+-------------+---------+\npersonId is the primary key (column with unique values) for this table.\nThis table contains information about the ID of some persons and their first and last names.\n\n\n\nTable: `Address`\n\n\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| addressId   | int     |\n| personId    | int     |\n| city        | varchar |\n| state       | varchar |\n+-------------+---------+\naddressId is the primary key (column with unique values) for this table.\nEach row of this table contains information about the city and state of one person with ID = PersonId.\n\n\n\nWrite a solution to report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report `null` instead.\n\nReturn the result table in **any order**.\n\nThe result format is in the following example.\n\n**Example 1:**\n**Input:** \nPerson table:\n+----------+----------+-----------+\n| personId | lastName | firstName |\n+----------+----------+-----------+\n| 1        | Wang     | Allen     |\n| 2        | Alice    | Bob       |\n+----------+----------+-----------+\nAddress table:\n+-----------+----------+---------------+------------+\n| addressId | personId | city          | state      |\n+-----------+----------+---------------+------------+\n| 1         | 2        | New York City | New York   |\n| 2         | 3        | Leetcode      | California |\n+-----------+----------+---------------+------------+\n**Output:** \n+-----------+----------+---------------+----------+\n| firstName | lastName | city          | state    |\n+-----------+----------+---------------+----------+\n| Allen     | Wang     | Null          | Null     |\n| Bob       | Alice    | New York City | New York |\n+-----------+----------+---------------+----------+\n**Explanation:** \nThere is no address in the address table for the personId = 1 so we return null in their city and state.\naddressId = 1 contains information about the address of personId = 2.\n\n"
    },
    {
        "title": "Repeated DNA Sequences",
        "complexity": "medium",
        "categories": [
            "Hash Table",
            "String",
            "Bit Manipulation",
            "Sliding Window",
            "Rolling Hash",
            "Hash Function",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/repeated-dna-sequences/",
        "description": "The **DNA sequence** is composed of a series of nucleotides abbreviated as `'A'`, `'C'`, `'G'`, and `'T'`.\n\n* For example, `\"ACGAATTCCG\"` is a **DNA sequence**.\n\nWhen studying **DNA**, it is useful to identify repeated sequences within the DNA.\n\nGiven a string `s` that represents a **DNA sequence**, return all the **`10`-letter-long** sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in **any order**.\n\n**Example 1:**\n**Input:** s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"\n**Output:** [\"AAAAACCCCC\",\"CCCCCAAAAA\"]\n\n**Example 2:**\n**Input:** s = \"AAAAAAAAAAAAA\"\n**Output:** [\"AAAAAAAAAA\"]\n\n**Constraints:**\n* `1 <= s.length <= 105`\n* `s[i]` is either `'A'`, `'C'`, `'G'`, or `'T'`.\n\n"
    },
    {
        "title": "Course Schedule",
        "complexity": "medium",
        "categories": [
            "Depth-First Search",
            "Breadth-First Search",
            "Graph",
            "Topological Sort",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/course-schedule/",
        "description": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.\n\n* For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.\n\n**Example 1:**\n**Input:** numCourses = 2, prerequisites = [[1,0]]\n**Output:** true\n**Explanation:** There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.\n\n**Example 2:**\n**Input:** numCourses = 2, prerequisites = [[1,0],[0,1]]\n**Output:** false\n**Explanation:** There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.\n\n**Constraints:**\n* `1 <= numCourses <= 2000`\n* `0 <= prerequisites.length <= 5000`\n* `prerequisites[i].length == 2`\n* `0 <= ai, bi < numCourses`\n* All the pairs prerequisites[i] are **unique**.\n\n"
    },
    {
        "title": "LRU Cache",
        "complexity": "medium",
        "categories": [
            "Hash Table",
            "Linked List",
            "Design",
            "Doubly-Linked List",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/lru-cache/",
        "description": "Design a data structure that follows the constraints of a **[Least Recently Used (LRU) cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)**.\n\nImplement the `LRUCache` class:\n\n* `LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.\n* `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.\n* `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.\n\nThe functions `get` and `put` must each run in `O(1)` average time complexity.\n\n**Example 1:**\n**Input**\n[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\n**Output**\n[null, null, null, 1, null, -1, null, -1, 3, 4]\n**Explanation**\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4\n\n**Constraints:**\n* `1 <= capacity <= 3000`\n* `0 <= key <= 104`\n* `0 <= value <= 105`\n* At most `2 * 105` calls will be made to `get` and `put`.\n\n"
    },
    {
        "title": "Longest Common Subsequence",
        "complexity": "medium",
        "categories": [
            "String",
            "Dynamic Programming",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/longest-common-subsequence/",
        "description": "Given two strings `text1` and `text2`, return *the length of their longest **common subsequence**.* If there is no **common subsequence**, return `0`.\n\nA **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n\n* For example, `\"ace\"` is a subsequence of `\"abcde\"`.\n\nA **common subsequence** of two strings is a subsequence that is common to both strings.\n\n**Example 1:**\n**Input:** text1 = \"abcde\", text2 = \"ace\" \n**Output:** 3  \n**Explanation:** The longest common subsequence is \"ace\" and its length is 3.\n\n**Example 2:**\n**Input:** text1 = \"abc\", text2 = \"abc\"\n**Output:** 3\n**Explanation:** The longest common subsequence is \"abc\" and its length is 3.\n\n**Example 3:**\n**Input:** text1 = \"abc\", text2 = \"def\"\n**Output:** 0\n**Explanation:** There is no such common subsequence, so the result is 0.\n\n**Constraints:**\n* `1 <= text1.length, text2.length <= 1000`\n* `text1` and `text2` consist of only lowercase English characters.\n\n"
    },
    {
        "title": "Rotate Image",
        "complexity": "medium",
        "categories": [
            "Array",
            "Math",
            "Matrix",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/rotate-image/",
        "description": "You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90** degrees (clockwise).\n\nYou have to rotate the image [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm), which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.\n\n**Example 1:**\n![](https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg)\n\n**Input:** matrix = [[1,2,3],[4,5,6],[7,8,9]]\n**Output:** [[7,4,1],[8,5,2],[9,6,3]]\n\n**Example 2:**\n![](https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg)\n\n**Input:** matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\n**Output:** [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n\n**Constraints:**\n* `n == matrix.length == matrix[i].length`\n* `1 <= n <= 20`\n* `-1000 <= matrix[i][j] <= 1000`\n\n"
    },
    {
        "title": "Airplane Seat Assignment Probability",
        "complexity": "medium",
        "categories": [
            "Math",
            "Dynamic Programming",
            "Probability and Statistics",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/airplane-seat-assignment-probability/",
        "description": "`n` passengers board an airplane with exactly `n` seats. The first passenger has lost the ticket and picks a seat randomly. But after that, the rest of the passengers will:\n\n* Take their own seat if it is still available, and\n* Pick other seats randomly when they find their seat occupied\n\nReturn *the probability that the* `nth` *person gets his own seat*.\n\n**Example 1:**\n**Input:** n = 1\n**Output:** 1.00000\n**Explanation:** The first person can only get the first seat.\n\n**Example 2:**\n**Input:** n = 2\n**Output:** 0.50000\n**Explanation:** The second person has a probability of 0.5 to get the second seat (when first person gets the first seat).\n\n**Constraints:**\n* `1 <= n <= 105`\n\n"
    },
    {
        "title": "Validate Binary Search Tree",
        "complexity": "medium",
        "categories": [
            "Tree",
            "Depth-First Search",
            "Binary Search Tree",
            "Binary Tree",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/validate-binary-search-tree/",
        "description": "Given the `root` of a binary tree, *determine if it is a valid binary search tree (BST)*.\n\nA **valid BST** is defined as follows:\n\n* The left subtree of a node contains only nodes with keys **less than** the node's key.\n* The right subtree of a node contains only nodes with keys **greater than** the node's key.\n* Both the left and right subtrees must also be binary search trees.\n\n**Example 1:**\n![](https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg)\n\n**Input:** root = [2,1,3]\n**Output:** true\n\n**Example 2:**\n![](https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg)\n\n**Input:** root = [5,1,4,null,null,3,6]\n**Output:** false\n**Explanation:** The root node's value is 5 but its right child's value is 4.\n\n**Constraints:**\n* The number of nodes in the tree is in the range `[1, 104]`.\n* `-231 <= Node.val <= 231 - 1`\n\n"
    },
    {
        "title": "Sliding Window Maximum",
        "complexity": "hard",
        "categories": [
            "Array",
            "Queue",
            "Sliding Window",
            "Heap (Priority Queue)",
            "Monotonic Queue",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/sliding-window-maximum/",
        "description": "You are given an array of integers`nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn *the max sliding window*.\n\n**Example 1:**\n**Input:** nums = [1,3,-1,-3,5,3,6,7], k = 3\n**Output:** [3,3,5,5,6,7]\n**Explanation:** \nWindow position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       **3**\n 1 [3  -1  -3] 5  3  6  7       **3**\n 1  3 [-1  -3  5] 3  6  7       **5**\n 1  3  -1 [-3  5  3] 6  7       **5**\n 1  3  -1  -3 [5  3  6] 7       **6**\n 1  3  -1  -3  5 [3  6  7]      **7**\n\n**Example 2:**\n**Input:** nums = [1], k = 1\n**Output:** [1]\n\n**Constraints:**\n* `1 <= nums.length <= 105`\n* `-104 <= nums[i] <= 104`\n* `1 <= k <= nums.length`\n\n"
    },
    {
        "title": "N-Queens",
        "complexity": "hard",
        "categories": [
            "Array",
            "Backtracking",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/n-queens/",
        "description": "The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.\n\n**Example 1:**\n![](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)\n\n**Input:** n = 4\n**Output:** [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n**Explanation:** There exist two distinct solutions to the 4-queens puzzle as shown above\n\n**Example 2:**\n**Input:** n = 1\n**Output:** [[\"Q\"]]\n\n**Constraints:**\n* `1 <= n <= 9`\n\n"
    },
    {
        "title": "Serialize and Deserialize Binary Tree",
        "complexity": "hard",
        "categories": [
            "String",
            "Tree",
            "Depth-First Search",
            "Breadth-First Search",
            "Design",
            "Binary Tree",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\n\n**Clarification:** The input/output format is the same as [how LeetCode serializes a binary tree](https://support.leetcode.com/hc/en-us/articles/360011883654-What-does-1-null-2-3-mean-in-binary-tree-representation-). You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.\n\n**Example 1:**\n![](https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg)\n\n**Input:** root = [1,2,3,null,null,4,5]\n**Output:** [1,2,3,null,null,4,5]\n\n**Example 2:**\n**Input:** root = []\n**Output:** []\n\n**Constraints:**\n* The number of nodes in the tree is in the range `[0, 104]`.\n* `-1000 <= Node.val <= 1000`\n\n"
    },
    {
        "title": "Wildcard Matching",
        "complexity": "hard",
        "categories": [
            "String",
            "Dynamic Programming",
            "Greedy",
            "Recursion",
            "Algorithms"
        ],
        "link": "https://leetcode.com/problems/wildcard-matching/",
        "description": "Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `'?'` and `'*'` where:\n\n* `'?'` Matches any single character.\n* `'*'` Matches any sequence of characters (including the empty sequence).\n\nThe matching should cover the **entire** input string (not partial).\n\n**Example 1:**\n**Input:** s = \"aa\", p = \"a\"\n**Output:** false\n**Explanation:** \"a\" does not match the entire string \"aa\".\n\n**Example 2:**\n**Input:** s = \"aa\", p = \"*\"\n**Output:** true\n**Explanation:**'*' matches any sequence.\n\n**Example 3:**\n**Input:** s = \"cb\", p = \"?a\"\n**Output:** false\n**Explanation:**'?' matches 'c', but the second letter is 'a', which does not match 'b'.\n\n**Constraints:**\n* `0 <= s.length, p.length <= 2000`\n* `s` contains only lowercase English letters.\n* `p` contains only lowercase English letters, `'?'` or `'*'`.\n\n"
    },
    {
        "title": "Chalkboard XOR Game",
        "complexity": "hard",
        "categories": [
            "Array",
            "Math",
            "Bit Manipulation",
            "Brainteaser",
            "Game Theory"
        ],
        "link": "https://leetcode.com/problems/chalkboard-xor-game/",
        "description": "You are given an array of integers `nums` represents the numbers written on a chalkboard.\n\nAlice and Bob take turns erasing exactly one number from the chalkboard, with Alice starting first. If erasing a number causes the bitwise XOR of all the elements of the chalkboard to become `0`, then that player loses. The bitwise XOR of one element is that element itself, and the bitwise XOR of no elements is `0`.\n\nAlso, if any player starts their turn with the bitwise XOR of all the elements of the chalkboard equal to `0`, then that player wins.\n\nReturn `true` *if and only if Alice wins the game, assuming both players play optimally*.\n\n**Example 1:**\n**Input:** nums = [1,1,2]\n**Output:** false\n**Explanation:** \nAlice has two choices: erase 1 or erase 2. \nIf she erases 1, the nums array becomes [1, 2]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 2 = 3. Now Bob can remove any element he wants, because Alice will be the one to erase the last element and she will lose. \nIf Alice erases 2 first, now nums become [1, 1]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 1 = 0. Alice will lose.\n\n**Example 2:**\n**Input:** nums = [0,1]\n**Output:** true\n\n**Example 3:**\n**Input:** nums = [1,2,3]\n**Output:** true\n\n**Constraints:**\n* `1 <= nums.length <= 1000`\n* `0 <= nums[i] < 216`\n\n"
    },
    {
        "title": "Trips and Users",
        "complexity": "hard",
        "categories": [
            "Database"
        ],
        "link": "https://leetcode.com/problems/trips-and-users/",
        "description": "Table: `Trips`\n\n\n+-------------+----------+\n| Column Name | Type     |\n+-------------+----------+\n| id          | int      |\n| client_id   | int      |\n| driver_id   | int      |\n| city_id     | int      |\n| status      | enum     |\n| request_at  | date     |     \n+-------------+----------+\nid is the primary key (column with unique values) for this table.\nThe table holds all taxi trips. Each trip has a unique id, while client_id and driver_id are foreign keys to the users_id at the Users table.\nStatus is an ENUM (category) type of ('completed', 'cancelled_by_driver', 'cancelled_by_client').\n\n\n\nTable: `Users`\n\n\n+-------------+----------+\n| Column Name | Type     |\n+-------------+----------+\n| users_id    | int      |\n| banned      | enum     |\n| role        | enum     |\n+-------------+----------+\nusers_id is the primary key (column with unique values) for this table.\nThe table holds all users. Each user has a unique users_id, and role is an ENUM type of ('client', 'driver', 'partner').\nbanned is an ENUM (category) type of ('Yes', 'No').\n\n\n\nThe **cancellation rate** is computed by dividing the number of canceled (by client or driver) requests with unbanned users by the total number of requests with unbanned users on that day.\n\nWrite a solution to find the **cancellation rate** of requests with unbanned users (**both client and driver must not be banned**) each day between `\"2013-10-01\"` and `\"2013-10-03\"`. Round `Cancellation Rate` to **two decimal** points.\n\nReturn the result table in **any order**.\n\nTheresult format is in the following example.\n\n**Example 1:**\n**Input:** \nTrips table:\n+----+-----------+-----------+---------+---------------------+------------+\n| id | client_id | driver_id | city_id | status              | request_at |\n+----+-----------+-----------+---------+---------------------+------------+\n| 1  | 1         | 10        | 1       | completed           | 2013-10-01 |\n| 2  | 2         | 11        | 1       | cancelled_by_driver | 2013-10-01 |\n| 3  | 3         | 12        | 6       | completed           | 2013-10-01 |\n| 4  | 4         | 13        | 6       | cancelled_by_client | 2013-10-01 |\n| 5  | 1         | 10        | 1       | completed           | 2013-10-02 |\n| 6  | 2         | 11        | 6       | completed           | 2013-10-02 |\n| 7  | 3         | 12        | 6       | completed           | 2013-10-02 |\n| 8  | 2         | 12        | 12      | completed           | 2013-10-03 |\n| 9  | 3         | 10        | 12      | completed           | 2013-10-03 |\n| 10 | 4         | 13        | 12      | cancelled_by_driver | 2013-10-03 |\n+----+-----------+-----------+---------+---------------------+------------+\nUsers table:\n+----------+--------+--------+\n| users_id | banned | role   |\n+----------+--------+--------+\n| 1        | No     | client |\n| 2        | Yes    | client |\n| 3        | No     | client |\n| 4        | No     | client |\n| 10       | No     | driver |\n| 11       | No     | driver |\n| 12       | No     | driver |\n| 13       | No     | driver |\n+----------+--------+--------+\n**Output:** \n+------------+-------------------+\n| Day        | Cancellation Rate |\n+------------+-------------------+\n| 2013-10-01 | 0.33              |\n| 2013-10-02 | 0.00              |\n| 2013-10-03 | 0.50              |\n+------------+-------------------+\n**Explanation:** \nOn 2013-10-01:\n  - There were 4 requests in total, 2 of which were canceled.\n  - However, the request with Id=2 was made by a banned client (User_Id=2), so it is ignored in the calculation.\n  - Hence there are 3 unbanned requests in total, 1 of which was canceled.\n  - The Cancellation Rate is (1 / 3) = 0.33\nOn 2013-10-02:\n  - There were 3 requests in total, 0 of which were canceled.\n  - The request with Id=6 was made by a banned client, so it is ignored.\n  - Hence there are 2 unbanned requests in total, 0 of which were canceled.\n  - The Cancellation Rate is (0 / 2) = 0.00\nOn 2013-10-03:\n  - There were 3 requests in total, 1 of which was canceled.\n  - The request with Id=8 was made by a banned client, so it is ignored.\n  - Hence there are 2 unbanned request in total, 1 of which were canceled.\n  - The Cancellation Rate is (1 / 2) = 0.50\n\n"
    }
];

export default sampleQuestions;