
// set instance.findVec to provide vecotr lookup for wordExpression parse/evaluation
export let instance = {
  async findVec(word: string): Promise<number[]> {
    throw new Error("Not implemented");
  }  
}