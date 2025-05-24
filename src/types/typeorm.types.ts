interface TypeOrmError extends Error {
    code?: string
    errno?: number
    sqlMessage?: string
}
export type { TypeOrmError }
