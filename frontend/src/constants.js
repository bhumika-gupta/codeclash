export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `function twoSum(arr, target) {
    // write your code here

  }
  let arr = [0, -1, 2, -3, 1];
  let target = -2;

  // Call the twoSum function and print the result
  if (twoSum(arr, target))
      console.log("true");
  else 
      console.log("false");`,

  typescript: `type Params = {
  name: string;
}

function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}

greet({ name: "Alex" });`,

  python: `def twoSum(arr, target):
  # write your code here
  arr = [0, -1, 2, -3, 1]
  target = -2

  # Call the two_sum function and print the result
  if twoSum(arr, target):
      print("true")
  else:
      print("false")`,

  java: `public class HelloWorld {
  public static void main(String[] args) {
      System.out.println("Hello World");
  }
}`,

  csharp: `using System;

namespace HelloWorld
{
  class Hello { 
    static void Main(string[] args) {
      Console.WriteLine("Hello World in C#");
    }
  }
}`,

  php: `<?php

$name = 'Alex';
echo $name;`
};
