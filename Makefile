# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20
## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\-0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Build application
build:
	@which dip &> /dev/null || gem install dip
	@which lefthook &> /dev/null || gem install lefthook
	@dip provision
	lefthook install
	@echo "${YELLOW}Webpack compiling...${RESET}"
	@rails webpacker:compile
	@echo "${YELLOW}Build completed.${RESET}"

## Reset webpack compiled code
webpack-reset-packs:
	@echo "${YELLOW}Removing packs...${RESET}"
# need permision to remove files from docker files
	@chmod 777 public
	@rails webpacker:clobber
	@echo "${YELLOW}Webpack compiling...${RESET}"
	@rails webpacker:compile
	@echo "${YELLOW}Restarting server...${RESET}"
	@dip compose restart webpacker web