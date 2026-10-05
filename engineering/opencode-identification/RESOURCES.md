# Идентификация сессий и процессов OpenCode — Resources

## Knowledge

- [OpenCode V2 docs — Intro](https://opencode.ai/v2/docs/)
  Точка входа. Выдержка из неё: «OpenCode uses a client-server architecture. A
  background server owns sessions, plugins, permissions». Ключ к пониманию, почему
  идентификация устроена как устроена. Использовать для проверки любого утверждения
  о полях и поведении.

- [Machine-readable docs index](https://opencode.ai/v2/llms.txt)
  Полный список всех страниц V2 в одном тексте. Дешевле, чем гуглить, когда надо
  найти конкретную тему. Один curl — и весь индекс.

- [OpenCode V2 — Troubleshooting](https://opencode.ai/v2/docs/troubleshooting/)
  Единственная страница, где документированы `run` и `role` в логах, путь к
  `opencode.log`, профили по SIGPROF/SIGUSR1, и файлы `service.json` с разделением
  на `~/.local/state/` и `~/.config/`. Источник для §9–10 рабочего документа.

- [OpenCode V2 — Agents](https://opencode.ai/v2/docs/agents/)
  Что такое `agent`, режимы `primary`/`subagent`, и crucially — что `permissions`
  это упорядоченный список `{action,resource,effect}`, где последнее совпадение
  выигрывает. Откуда взялось `POST /api/session/{id}/agent`.

- [OpenCode V2 — API reference](https://opencode.ai/v2/docs/api/)
  Полный перечень 141 операции. Нужен, чтобы знать, какие поля вообще бывают:
  `/api/session` (agent, projectID, location, parentID), `/api/info` (version, pid,
  urls), `/api/project`, `/api/location`. Живой `/openapi.json` отдаёт то же самое
  с аутентификацией.

- [git-commit man page](https://git-scm.com/docs/git-commit)
  Источник по `--trailer`: флаг существует с 2.32, синтаксис
  `--trailer <token>[(=|:)<value>]`. Проверять любое утверждение «флага git нет»
  именно здесь, а не через `git commit -h` вне репозитория.

- [git-interpret-trailers man page](https://git-scm.com/docs/git-interpret-trailers)
  Откуда взялась ошибка про `--file-in-place` (флага нет), про `--in-place`
  (дописывает, а не заменяет) и про то, что на stdin команда только печатает.

## Wisdom (Communities)

- [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode/issues)
  Issue-трекер самого opencode. Здесь отвечают разработчики, и в issues лежат
  ответы на вопросы «как идентифицировать сессию», которые в доках не описаны.
  Искать при `Gaps` ниже.

- Локально: `~/pdf-pulse-dev/docs/agents/roster.md` и `AGENTS.md` § Атрибуция
  Это уже готовый ответ на вопрос «как в моём репозитории атрибутировать агента» —
  позывные, `Assisted-by`, поле в PR-шаблоне. Читать до, а не после первого
  коммита.

## Gaps

- **run id как первоклассная сущность.** Доки упоминают `run` только как
  grep-фильтр в troubleshooting. Нет документации, что он идентифицирует процесс,
  ни как его получить программно, ни про его связь с сессией (в логе many-to-many:
  54 run на несколько сессий, 19 сессий на несколько run).
- **Жизненный цикл instance UUID.** Документировано, что он есть в
  `service.json`. Не документировано, что он **меняется при каждом старте** —
  проверено экспериментально на изолированном инстансе. Пробел в доках, который
  стоит закрыть issue'ом.
- **`x-opencode-session` и остальные шесть заголовков.** В OpenAPI их нет, они
  видны только в бинарнике. Нигде не документированы. PDF-отчёт был прав, а доки
  молчат.
- **Хост и OS в идентификации.** Отсутствуют, и это нигде не сказано явно.
  Пользователь, ищущий по хосту, упирается в стену молчания.