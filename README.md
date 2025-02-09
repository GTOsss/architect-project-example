# Пример кодогенератора
Основан на модулях:
- [architect-project](https://www.npmjs.com/package/architect-project?activeTab=readme) 
- [architect-project-plugin-open-api](https://www.npmjs.com/package/architect-project-plugin-open-api)

# Краткое описание логики.
При запуске команды `arc s`
`architect-project` читает файлы и директории:
- `architect/config.ts` - общая конфигурация
- `architect/templates` - директория со всеми шаблонами  
- `architect/source_map/source-map-module.ts` - карта на основе которой будут генерироваться файлы

Затем `architect-project` создает файлы на основе шаблонов. 

Все это нужно для автоматизации рутинных действий и генерации шаблонного кода. Что бы сгенерировать код нужно выполнить несколько действий:
- Описать шаблон в директории `architect/templates`,
- В файле `architect/source_map/source-map-module.ts` описать инструкцию согласно которой будут созданы файлы по соответствующему шаблону.

Более подробное описание и инструкция в файле `architect/README.md`

[Документация по architect-project](https://adoring-lumiere-132367.netlify.app/)