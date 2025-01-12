import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [complexityAnalysis, setComplexityAnalysis] = useState(null); // Store time complexity analysis results

  // Function to run code and analyze complexity
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);

      // Step 1: Run the code and get results
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(result.stderr ? true : false);

      // Step 2: Analyze time complexity based on brute-force check
      const timeComplexity = analyzeTimeComplexity(sourceCode);
      setComplexityAnalysis(timeComplexity); // Store the analysis result

    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if the solution is brute force for TwoSum and analyze time complexity
  const analyzeTimeComplexity = (sourceCode) => {
    // Log the source code to check what it contains
    console.log(sourceCode);
  
    // Check for common patterns of brute force (nested loops)
    const forLoopsCount = (sourceCode.match(/for/g) || []).length;

    // Check if there are exactly two 'for' loops (nested loops)
    const isBruteForce = forLoopsCount === 2;    
    if (isBruteForce) {
      return (
        <>
          <Text fontSize="sm" fontWeight="bold">Time Complexity:</Text>
          <Text>Brute Force Approach: O(n^2) (nested loops for checking every pair)</Text>
          <Text fontSize="sm" fontWeight="bold">Improvement Suggestion:</Text>
          <Text>Consider using a hash map to reduce the time complexity to O(n). Here's how:</Text>
          <Text>
            1. Iterate through the array once, storing the difference between the target and the current element in a hash map.
            2. In the second pass, check if the current element exists in the map.
          </Text>
        </>
      );
    }
  
    // More flexible check for optimal solution (using map or set)
    const isOptimal = /([a-zA-Z_]\w*)\s*-\s*([a-zA-Z_]\w*)/.test(sourceCode) && 
                      (sourceCode.includes("map[") || sourceCode.includes("set[") || sourceCode.includes("set(")  );
  
    if (isOptimal) {
      return (
        <>
          <Text fontSize="sm" fontWeight="bold">Time Complexity:</Text>
          <Text>Optimal Approach: O(n) (Using a hashmap to find the complement)</Text>
          <Text fontSize="sm" fontWeight="bold">Improvement Suggestion:</Text>
          <Text>None: This is the optimal solution given the task at hand</Text>
        </>
      );
    } else {
      // Provide a general time complexity if it's not brute force or optimal
      return (
        <>
          <Text fontSize="sm" fontWeight="bold">Time Complexity:</Text>
          <Text>Unknown/Optimized Approach: Time complexity varies depending on the algorithm.</Text>
          <Text>If this is an unrecognized solution, consider refining your implementation for better performance.</Text>
        </>
      );
    }
  };
  
  return (
  
    <Box w="50%">

      <Text mb={1} fontSize="lg">Output</Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>

      {/* Time Complexity Analysis */}
      {complexityAnalysis && (
        <Box mb={4} p={2} border="1px solid" borderRadius={4} borderColor="gray.300">
          {complexityAnalysis}
        </Box>
      )}

      <Box
        height="75vh"
        p={1}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
