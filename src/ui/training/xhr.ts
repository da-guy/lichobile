import { fetchJSON } from '../../http'
import { PuzzleData, PuzzleSyncData, RoundData, PuzzleOutcome } from '../../lichess/interfaces/training'

export function round(outcome: PuzzleOutcome): Promise<RoundData> {
  return fetchJSON(`/training/${outcome.id}/round2`, {
    method: 'POST',
    body: JSON.stringify({
      win: outcome.win ? 1 : 0
    })
  })
}

export function vote(id: number, v: boolean): Promise<[boolean, number]> {
  return fetchJSON(`/training/${id}/vote`, {
    method: 'POST',
    body: JSON.stringify({
      vote: v ? 1 : 0
    })
  })
}

export function loadPuzzle(id: number): Promise<PuzzleData> {
  return fetchJSON<PuzzleData>(`/training/${id}/load`)
  .then(cfg => {
    cfg.online = true
    return cfg
  })
}

export function newPuzzle(): Promise<PuzzleData> {
  return fetchJSON<PuzzleData>('/training/new')
  .then(cfg => {
    cfg.online = true
    return cfg
  })
}

export function newPuzzles(num: number): Promise<PuzzleSyncData> {
  return fetchJSON<PuzzleSyncData>('/training/batch', {
    method: 'GET',
    query: { nb: num }
  })
}

export function solvePuzzles(outcomes: PuzzleOutcome[]): Promise<void> {
  return fetchJSON(`/training/batch`, {
    method: 'POST',
    body: JSON.stringify({
      solutions: outcomes
    })
  })
}
