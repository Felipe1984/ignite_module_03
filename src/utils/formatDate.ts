interface FormatDate {
   date: Date;
   options: {
      day: "2-digit" | "numeric",
      month: "long" | "narrow" | "short" | "numeric" | "2-digit",
      year: "2-digit" | "numeric"
   }
}

export function formatDate(dateToFormat: FormatDate) {
   const { date, options } = dateToFormat;
   const formatedDate = Intl.DateTimeFormat("pt-BR", options)
      .format(date);

   return formatedDate
}