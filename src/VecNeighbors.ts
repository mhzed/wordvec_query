export interface VecNeighborEntry {
  id: number,
  dist: number
};

export interface VecNeighbors {
  /**
   * Get k nearest neighbours from vector
   * 
   * @param {number[]} vector
   * @param {number} k
   * @returns {VecNeighborEntry[]}
   */
  knn(vector: number[], k: number) : Promise<VecNeighborEntry[]>;
}