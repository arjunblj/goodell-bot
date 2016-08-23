import { getStandings } from './utils'

async function main() {
  const data = await getStandings()
  console.log(data)
}

main()
