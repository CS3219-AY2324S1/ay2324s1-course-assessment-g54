const sampleQuestions = [
    {
    "title" : "Reverse a String",
    "categories": ["Strings", "Algorithms"],
    "complexity": "easy",
    "link": "https://leetcode.com/problems/reverse-string/",
    "description": "Write a function that reverses a string."
    },
    {
    "title" : "Linked List Cycle Detection",
    "categories": ["Data Structures", "Algorithms"],
    "complexity": "easy",
    "link": "https://leetcode.com/problems/linked-list-cycle/",
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it."
    },
    {
    "title" : "Roman to Integer",
    "categories": ["Algorithms"],
    "complexity": "easy",
    "link": "https://leetcode.com/problems/roman-to-integer/",
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\nI can be placed before V (5) and X (10) to make 4 and 9. \nX can be placed before L (50) and C (100) to make 40 and 90. \nC can be placed before D (500) and M (1000) to make 400 and 900.\nGiven a roman numeral, convert it to an integer.\n\nExample 1:\nInput: s = \"III\"\nOutput: 3\nExplanation: III = 3.\nExample 2:\nInput: s = \"LVIII\"\nOutput: 58\nExplanation: L = 50, V= 5, III = 3.\nExample 3:\nInput: s = \"MCMXCIV\"\nOutput: 1994\nExplanation: M = 1000, CM = 900, XC = 90 and IV = 4.\n\n\nConstraints:\n1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999]."
    },
    {
    "title" : "Repeated DNA Sequences",
    "categories": ["Algorithms", "Bit Manipulation"],
    "complexity": "medium",
    "link": "https://leetcode.com/problems/repeated-dna-sequences/",
    "description": "The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.\nFor example, \"ACGAATTCCG\" is a DNA sequence.\nWhen studying DNA, it is useful to identify repeated sequences within the DNA.\nGiven a string s that represents a DNA sequence, return all the 10-letter- long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.\nExample 1:\nInput: s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\" Output: [\"AAAAACCCCC\",\"CCCCCAAAAA\"]\nExample 2:\nInput: s = \"AAAAAAAAAAAAA\" Output: [\"AAAAAAAAAA\"]\nConstraints:\n- 1 <= s.length <= 105\n- s[i] is either 'A', 'C', 'G', or 'T'."
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
    "description": "You are given an array of integers nums, there is a sliding window of size k which is ..."
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