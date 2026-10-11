import { PRIORITIES } from '../interfaces/task'

const STYLES = {
  critical: 'border-gold text-gold-pale bg-gold/20',
  high: 'border-gold-dark text-gold bg-gold-dark/10',
  medium: 'border-bronze-light text-bone bg-bronze/20',
  low: 'border-bronze text-ash bg-transparent',
}

/** Önceliği lonca rütbesi harfiyle (S/A/B/C) gösterir. */
export default function PriorityBadge({ priority }) {
  // Tanımsız bir öncelik gelirse (ör. elle değiştirilmiş LocalStorage) "Orta" gösterilir
  const { value, rank, label } = PRIORITIES.find((p) => p.value === priority) ?? PRIORITIES[2]
  return (
    <span
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border font-display text-base font-semibold ${STYLES[value]}`}
      title={`${rank} rütbesi — ${label} öncelik`}
    >
      {rank}
    </span>
  )
}
