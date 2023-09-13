const sampleQuestions = [
    {
    "title" : "Reverse a String",
    "categories": ["Strings", "Algorithms"],
    "complexity": "easy",
    "link": "https://leetcode.com/problems/reverse-string/",
    "description": "Write a function that reverses a string. The input string is given as an array of characters s.\nYou must do this by modifying the input array in-place with O(1) extra memory.\n\nExample 1:\nInput: s = [\"h\",\"e\",\"l\",\"l\",\"o\"] Output: [\"o\",\"l\",\"l\",\"e\",\"h\"]\n\nExample 2:\nInput: s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"] Output: [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]\n\nConstraints:\n- 1 <= s.length <= 105\n- s[i] is a printable ascii character."
    },
    {
    "title" : "Linked List Cycle Detection",
    "categories": ["Data Structures", "Algorithms"],
    "complexity": "easy",
    "link": "https://leetcode.com/problems/linked-list-cycle/",
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.\n\nReturn true if there is a cycle in the linked list. Otherwise, return false.\n\nExample 1:\nInput: head = [3,2,0,-4], pos = 1\nOutput: true\nExplanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n\nExample 2:\nInput: head = [1,2], pos = 0\nOutput: true\nExplanation: There is a cycle in the linked list, where the tail connects to the 0th node.\n\nExample 3:\nInput: head = [1], pos = -1\nOutput: false\nExplanation: There is no cycle in the linked list.\n\nConstraints:\n- The number of the nodes in the list is in the range [0, 104].\n- -105 <= Node.val <= 105\n- pos is -1 or a valid index in the linked-list.\nFollow up: Can you solve it using O(1) (i.e. constant) memory?"
    },
    {
    "title" : "Roman to Integer",
    "categories": ["Algorithms"],
    "complexity": "easy",
    "link": "https://leetcode.com/problems/roman-to-integer/",
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\nI can be placed before V (5) and X (10) to make 4 and 9. \nX can be placed before L (50) and C (100) to make 40 and 90. \nC can be placed before D (500) and M (1000) to make 400 and 900.\nGiven a roman numeral, convert it to an integer.\n\nExample 1:\nInput: s = \"III\"\nOutput: 3\nExplanation: III = 3.\n\nExample 2:\nInput: s = \"LVIII\"\nOutput: 58\nExplanation: L = 50, V= 5, III = 3.\n\nExample 3:\nInput: s = \"MCMXCIV\"\nOutput: 1994\nExplanation: M = 1000, CM = 900, XC = 90 and IV = 4.\n\nConstraints:\n1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999]."
    },
    {
    "title" : "Add Binary",
    "categories": ["Bit Manipulation", "Algorithms"],
    "complexity": "easy",
    "link": "https://leetcode.com/problems/add-binary/",
    "description": "Given two binary strings a and b, return their sum as a binary string.\n\nExample 1:\nInput: a = \"11\", b = \"1\"\nOutput: \"100\"\n\nExample 2:\nInput: a = \"1010\", b = \"1011\"\nOutput: \"10101\"\n\nConstraints:\n1 <= a.length, b.length <= 104\na and b consist only of '0' or '1' characters.\nEach string does not contain leading zeros except for the zero itself."
    },
    {
    "title" : "Repeated DNA Sequences",
    "categories": ["Algorithms", "Bit Manipulation"],
    "complexity": "medium",
    "link": "https://leetcode.com/problems/repeated-dna-sequences/",
    "description": "The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.\n\nFor example, \"ACGAATTCCG\" is a DNA sequence.\n\nWhen studying DNA, it is useful to identify repeated sequences within the DNA.\n\nGiven a string s that represents a DNA sequence, return all the 10-letter- long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.\n\nExample 1:\nInput: s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\" Output: [\"AAAAACCCCC\",\"CCCCCAAAAA\"]\n\nExample 2:\nInput: s = \"AAAAAAAAAAAAA\" Output: [\"AAAAAAAAAA\"]\n\nConstraints:\n- 1 <= s.length <= 105\n- s[i] is either 'A', 'C', 'G', or 'T'."
    },
    {
    "title" : "Course Schedule",
    "categories": ["Data Structures", "Algorithms"],
    "complexity": "medium",
    "link": "https://leetcode.com/problems/course-schedule/",
    "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\nReturn true if you can finish all courses. Otherwise, return false.\n\nExample 1:\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: true\nExplanation: There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.\n\nExample 2:\nInput: numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false\nExplanation: There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.\n\nConstraints:\n1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll the pairs prerequisites[i] are unique."
    },
    {
    "title" : "Sliding Window Maximum",
    "categories": ["Arrays", "Algorithms"],
    "complexity": "hard",
    "link": "https://leetcode.com/problems/sliding-window-maximum//",
    "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\nReturn the max sliding window.\n\nExample 1:\nInput: nums = [1,3,-1,-3,5,3,6,7], k = 3 Output: [3,3,5,5,6,7]\nExplanation:\nWindow position        Max\n---------------       -----\n[1 3 -1] -3 5 3 6 7     3\n1 [3 -1 -3] 5 3 6 7     3\n1 3 [-1 -3 5] 3 6 7     5\n1 3 -1 [-3 5 3] 6 7     5\n1 3 -1 -3 [5 3 6] 7     6\n1 3 -1 -3 5 [3 6 7]     7\n\nExample 2:\nInput: nums = [1], k = 1 Output: [1]\n\nConstraints:\n- 1 <= nums.length <= 105\n- -104 <= nums[i] <= 104\n- 1 <= k <= nums.length"
    },
    {
    "title" : "N-Queen Problem",
    "categories": ["Algorithms"],
    "complexity": "hard",
    "link": "https://leetcode.com/problems/n-queens/",
    "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.\n\nExample 1:\nInput: n = 4\nOutput: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\nExplanation: There exist two distinct solutions to the 4-queens puzzle as shown above\n\nExample 2:\nInput: n = 1\nOutput: [[\"Q\"]]\n\nConstraints:\n1 <= n <= 9"
    }
];

export default sampleQuestions;